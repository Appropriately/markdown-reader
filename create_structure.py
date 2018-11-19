#!/usr/bin/env python
# A file which when run creates a json file based on the markdown folder
# structure, including folders and markdown files.

import os
import json

DOCUMENTATION_COMMENT_MARKER = "<!---DOC:"

# Handles the documentation in a markdown file
# Documentation format:
#   TITLE;DESCRIPTION;AUTHOR
def handle_markdown_documentation(file_path, json_object):
    # See if the first line has information on the file
    documentation_line = None;
    with open(file_path) as f:
        documentation_line = f.readline()

    # Handle adding the doc_line params
    if documentation_line[:9] == DOCUMENTATION_COMMENT_MARKER:
        # Remove the comment marks <!---DOC: & -->
        documentation = documentation_line[9:][:-4].split(';')
        json_object['file'] = documentation[0]
        json_object['description'] = documentation[1]
        json_object['author'] = documentation[2]

    return json_object


# Given some information on a file, output the information as a json object
def output_file_json(file_name, root):
    full_path = os.sep.join([root, file_name])

    # Construct the object
    json_object = {
        "file": file_name,
        "full_path": full_path,
        "size": os.stat(full_path)[6]
    }

    json_object = handle_markdown_documentation(full_path, json_object)

    return json_object


# File walking structure based on code from here:
# https://stackoverflow.com/a/2922878
def directory_to_json(current_directory):
    current, directories, files = os.walk(current_directory).next()

    files_in_directory = []
    sub_directories = []

    for file in files:
        if file.endswith('.md'):
            files_in_directory.append(output_file_json(file, current))

    for directory in directories:
        next_directory = current_directory + "/" + directory
        sub_directories.append(directory_to_json(next_directory))

    json_object = {
        "directory": current.split('/')[-1].capitalize() # Capitalise first char
    }

    # Check if directories and files exists, if so add them to the object
    if directories:
        json_object['directories'] = sub_directories
    if files:
        json_object['files'] = files_in_directory

    return json_object


# Output a file
with open('data.json', 'w+') as outfile:
    json.dump(directory_to_json('markdown'), outfile, indent=2)
