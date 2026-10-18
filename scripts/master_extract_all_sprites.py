import cv2
import numpy as np
from PIL import Image
import os

os.makedirs('public/sprites', exist_ok=True)

def extract_sprite(raw_img, x1, y1, x2, y2, bg_col, is_bg_fn, min_component_area=80):
    sub = raw_img[y1:y2, x1:x2].copy()
    sh, sw = sub.shape[:2]
    
    is_bg_candidate = is_bg_fn(sub, bg_col)
    
    # BFS from all 4 borders
    visited = np.zeros((sh, sw), dtype=bool)
    queue = []
    for x in range(sw):
        if is_bg_candidate[0, x]: visited[0, x] = True; queue.append((x, 0))
        if is_bg_candidate[sh-1, x]: visited[sh-1, x] = True; queue.append((x, sh-1))
    for y in range(sh):
        if is_bg_candidate[y, 0]: visited[y, 0] = True; queue.append((0, y))
        if is_bg_candidate[y, sw-1]: visited[y, sw-1] = True; queue.append((sw-1, y))

    idx = 0
    while idx < len(queue):
        cx, cy = queue[idx]
        idx += 1
        for nx, ny in [(cx+1, cy), (cx-1, cy), (cx, cy+1), (cx, cy-1)]:
            if 0 <= nx < sw and 0 <= ny < sh and not visited[ny, nx] and is_bg_candidate[ny, nx]:
                visited[ny, nx] = True
                queue.append((nx, ny))

    alpha = np.where(visited, 0, 255).astype(np.uint8)
    
    # Keep only main connected character parts (filter small floating noise)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats((alpha > 0).astype(np.uint8))
    clean_alpha = np.zeros_like(alpha)
    for label_id in range(1, num_labels):
        if stats[label_id, cv2.CC_STAT_AREA] >= min_component_area:
            clean_alpha[labels == label_id] = 255

    # Close any tiny 1-2px internal pinholes without expanding border
    clean_alpha = cv2.morphologyEx(clean_alpha, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))

    sub_rgb = cv2.cvtColor(sub, cv2.COLOR_BGR2RGB)
    rgba = np.dstack([sub_rgb, clean_alpha])

    # Tight crop
    non_empty = np.where(clean_alpha > 0)
    if len(non_empty[0]) > 0:
        min_y, max_y = np.min(non_empty[0]), np.max(non_empty[0])
        min_x, max_x = np.min(non_empty[1]), np.max(non_empty[1])
        pad = 4
        rgba = rgba[max(0, min_y-pad):min(sh, max_y+pad), max(0, min_x-pad):min(sw, max_x+pad)]

    return rgba

# ==================== 1. SHREYAS ====================
shreyas_raw = cv2.imread('public/attempt1_ui/shreyas_fighter_sprites.jpg')
shreyas_bg = np.array([0, 0, 0], dtype=float)

def shreyas_is_bg(sub, bg_col):
    diff = np.linalg.norm(sub.astype(float) - bg_col, axis=2)
    ch_max = np.max(sub, axis=2)
    ch_std = np.std(sub, axis=2)
    # Background or faint grey grid line
    return (diff <= 25) | ((ch_max <= 42) & (ch_std <= 8))

for pose, (x1, y1, x2, y2) in {
    'idle': (25, 100, 390, 680),
    'attack': (400, 80, 960, 680),
    'hurt': (980, 100, 1370, 680)
}.items():
    rgba = extract_sprite(shreyas_raw, x1, y1, x2, y2, shreyas_bg, shreyas_is_bg, min_component_area=100)
    img = Image.fromarray(rgba)
    img.save(f'public/sprites/shreyas_{pose}.png')
    print(f'Saved shreyas_{pose}: {img.size}')

# ==================== 2. RISHIT ====================
rishit_raw = cv2.imread('public/attempt1_ui/rishit_fighter_sprites.jpg')
rishit_raw[600:, :] = rishit_raw[0, 0] # cut text
rishit_bg = np.median(rishit_raw[:30, :60], axis=(0, 1))

def rishit_is_bg(sub, bg_col):
    diff = np.linalg.norm(sub.astype(float) - bg_col, axis=2)
    return diff <= 22

for pose, (x1, y1, x2, y2) in {
    'idle': (15, 120, 445, 600),
    'attack': (445, 120, 960, 600),
    'hurt': (960, 120, 1370, 600)
}.items():
    rgba = extract_sprite(rishit_raw, x1, y1, x2, y2, rishit_bg, rishit_is_bg, min_component_area=50)
    img = Image.fromarray(rgba)
    img.save(f'public/sprites/rishit_{pose}.png')
    print(f'Saved rishit_{pose}: {img.size}')

# ==================== 3. JEEVESH ====================
jeevesh_raw = cv2.imread('public/attempt1_ui/jeevesh_fighter_sprites.jpg')
jeevesh_bg = np.array([0, 0, 0], dtype=float)

def jeevesh_is_bg(sub, bg_col):
    diff = np.linalg.norm(sub.astype(float) - bg_col, axis=2)
    return diff <= 18

for pose, (x1, y1, x2, y2) in {
    'idle': (20, 120, 435, 680),
    'attack': (480, 80, 940, 710),
    'hurt': (950, 120, 1370, 680)
}.items():
    rgba = extract_sprite(jeevesh_raw, x1, y1, x2, y2, jeevesh_bg, jeevesh_is_bg, min_component_area=80)
    img = Image.fromarray(rgba)
    img.save(f'public/sprites/jeevesh_{pose}.png')
    print(f'Saved jeevesh_{pose}: {img.size}')

print("All 9 primary fighter sprites extracted perfectly.")
