import os
import glob
import shutil
from PIL import Image

src_dir = '/Users/tanushsingla/Downloads/images/'
dest_dir = '/Users/tanushsingla/antigravity/GoldenCare/public/images/'

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# Get all jpegs
files = glob.glob(os.path.join(src_dir, '*.jpeg'))
# Sort by modification time to get the latest ones if there are duplicates
files.sort(key=os.path.getmtime, reverse=True)

# Process the first 4 unique images
count = 1
for f in files[:4]:
    try:
        img = Image.open(f)
        width, height = img.size
        
        # Crop bottom 25%
        new_height = int(height * 0.75)
        cropped_img = img.crop((0, 0, width, new_height))
        
        dest_path = os.path.join(dest_dir, f'image{count}.jpg')
        cropped_img.save(dest_path)
        print(f"Saved cropped image to {dest_path}")
        count += 1
    except Exception as e:
        print(f"Error processing {f}: {e}")

