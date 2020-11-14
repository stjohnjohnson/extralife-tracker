#!/usr/bin/env python3

import json, sys

def getContent(folder, fileType):
    f = open(folder + '/widget.' + fileType, 'r')
    return f.read()

# Read desired folder
if len(sys.argv) < 2:
    sys.exit('Usage: generate-example.py folder-name')
folder = sys.argv[1]

# Craft our fancy HTML file with the JQuery that StreamElements includes by default
output = '\n'.join(('<html><head>',
    '<style>',
    getContent(folder, 'css'),
    '</style>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>',
    '<script type="application/javascript">',
    getContent(folder, 'js'),
    '</script>',
    '</head>',
    '<body>',
    getContent(folder, 'html'),
    '</body>'))

# Load the settings files
config = json.loads(getContent(folder, 'json'))

# Replace all keys with the default values
for key, value in config.items():
    output = output.replace('{{' + key + '}}', str(value['value']))

print(output)
