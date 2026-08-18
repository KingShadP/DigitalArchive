import os
import re

replacements = {
    r'bg-\[\#050505\]': 'bg-background',
    r'bg-\[\#080808\]': 'bg-surface',
    r'bg-\[\#0a0a0a\]': 'bg-surface-dim',
    r'bg-\[\#070707\]': 'bg-surface',
    r'bg-\[\#090909\]': 'bg-surface',
    r'bg-\[\#0b0b0b\]': 'bg-surface-dim',
    r'bg-\[\#020202\]': 'bg-background',
    
    r'text-\[\#c9c6c5\]': 'text-foreground',
    r'text-\[\#aaaaaa\]': 'text-foreground/70',
    r'text-\[\#999999\]': 'text-foreground/60',
    r'text-\[\#888888\]': 'text-foreground/50',
    r'text-\[\#777777\]': 'text-foreground/40',
    r'text-\[\#666666\]': 'text-foreground/30',
    r'text-\[\#dcc57b\]': 'text-accent',
    r'text-\[\#93000a\]': 'text-accent',
    
    r'border-\[\#222222\]': 'border-border-strong',
    r'border-\[\#1a1a1a\]': 'border-border',
    r'border-\[\#141414\]': 'border-border',
    r'border-\[\#333333\]': 'border-border-strong',
    r'border-\[\#444444\]': 'border-border-strong',
    r'border-\[\#555555\]': 'border-border-strong',
    
    r'hover:border-\[\#444444\]': 'hover:border-foreground',
    r'hover:border-\[\#555555\]': 'hover:border-foreground',
    r'hover:bg-white': 'hover:bg-foreground',
    r'hover:text-black': 'hover:text-background',
    
    r'bg-\[\#c9c6c5\]': 'bg-foreground',
    r'text-black': 'text-background',
    r'bg-black': 'bg-background',
    r'text-white': 'text-foreground',
    r'border-white/5': 'border-border',
    r'border-white/10': 'border-border',
    r'border-white/15': 'border-border-strong',
    r'border-white/20': 'border-border-strong',
    r'border-white/30': 'border-border-strong',
}

files_to_process = [
    'app/page.tsx', 
    'app/catalogue/client-page.tsx', 
    'components/art-direction-showcase.tsx',
    'components/bootloader.tsx',
    'components/navigation.tsx',
    'components/cinematic-background.tsx',
    'components/magnetic.tsx',
    'components/audio-provider.tsx'
]

for filepath in files_to_process:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
            
        for old, new in replacements.items():
            content = re.sub(old, new, content)
            
        with open(filepath, 'w') as f:
            f.write(content)

print("Done replacing.")
