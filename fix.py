import re

with open('app/catalogue/client-page.tsx', 'r') as f:
    content = f.read()

replacements = {
    r'text-foreground/90xl': 'text-5xl',
    r'text-accentxl': 'text-3xl',
    r'text-accentccentase': 'text-base',
    r'text-accentccentackground': 'text-black',
    r'hover:text-accentccentackground': 'hover:text-black',
    r'text-accentccent': 'text-black', 
}

for old, new in replacements.items():
    content = re.sub(old, new, content)
    
with open('app/catalogue/client-page.tsx', 'w') as f:
    f.write(content)
