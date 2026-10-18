import os
import cv2
import numpy as np
from PIL import Image

os.makedirs('public/sprites', exist_ok=True)

def clean_extract(img_path, character, regions, bg_thresh=52, crop_bottom_y=None):
    img = cv2.imread(img_path)
    h, w = img.shape[:2]
    
    if crop_bottom_y:
        img[crop_bottom_y:, :] = img[0, 0]
        
    bg_color = np.median(img[:20, :], axis=(0, 1))
    
    for pose_name, (x1, y1, x2, y2) in regions.items():
        sub_img = img[y1:y2, x1:x2].copy()
        sh, sw = sub_img.shape[:2]
        
        # Color difference from background
        diff = np.linalg.norm(sub_img.astype(float) - bg_color, axis=2)
        
        # Mask foreground
        is_fg = diff > bg_thresh
        
        # Specifically filter out faint grey grid lines: where max channel < 40
        # and standard deviation of RGB < 5 (neutral grey)
        ch_max = np.max(sub_img, axis=2)
        ch_std = np.std(sub_img, axis=2)
        is_grid = (ch_max < 38) & (ch_std < 6)
        is_fg[is_grid] = False
        
        alpha = np.zeros((sh, sw), dtype=np.uint8)
        alpha[is_fg] = 255
        
        # Keep only connected components with area > 40 to strip tiny noise
        num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats((alpha > 0).astype(np.uint8))
        clean_alpha = np.zeros_like(alpha)
        for label_id in range(1, num_labels):
            area = stats[label_id, cv2.CC_STAT_AREA]
            if area > 35:
                clean_alpha[labels == label_id] = 255
                
        sub_rgb = cv2.cvtColor(sub_img, cv2.COLOR_BGR2RGB)
        rgba = np.dstack([sub_rgb, clean_alpha])
        
        # Crop tight around the character
        non_empty = np.where(clean_alpha > 0)
        if len(non_empty[0]) > 0:
            min_y, max_y = np.min(non_empty[0]), np.max(non_empty[0])
            min_x, max_x = np.min(non_empty[1]), np.max(non_empty[1])
            pad = 4
            min_y = max(0, min_y - pad)
            max_y = min(sh, max_y + pad)
            min_x = max(0, min_x - pad)
            max_x = min(sw, max_x + pad)
            rgba = rgba[min_y:max_y, min_x:max_x]
            
        out_path = f'public/sprites/{character}_{pose_name}.png'
        pil_img = Image.fromarray(rgba)
        pil_img.save(out_path, format='PNG')
        print(f'Processed {out_path}: {pil_img.size}')

# Shreyas
clean_extract(
    'public/attempt1_ui/shreyas_fighter_sprites.jpg',
    'shreyas',
    {
        'idle': (25, 100, 390, 680),
        'attack': (400, 80, 960, 680),
        'hurt': (980, 100, 1370, 680)
    },
    bg_thresh=50
)

# Rishit
clean_extract(
    'public/attempt1_ui/rishit_fighter_sprites.jpg',
    'rishit',
    {
        'idle': (15, 120, 445, 600),
        'attack': (445, 120, 960, 600),
        'hurt': (960, 120, 1370, 600)
    },
    bg_thresh=42,
    crop_bottom_y=600
)

# Jeevesh (start attack at x=480 to skip left figure's fist)
clean_extract(
    'public/attempt1_ui/jeevesh_fighter_sprites.jpg',
    'jeevesh',
    {
        'idle': (20, 120, 435, 680),
        'attack': (480, 80, 940, 710),
        'hurt': (950, 120, 1370, 680)
    },
    bg_thresh=32
)
print('All transparent sprites exported successfully.')
