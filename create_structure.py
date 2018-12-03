#!/usr/bin/env python
# A file which when run creates a json file based on the markdown folder
# structure, including folders and markdown files.

import os
import json

DOCUMENTATION_COMMENT_MARKER = "<!---DOC:"

IGNORED_FOLDERS = ['.git', '.vscode', 'css', 'images', 'javascript']

# Handles the documentation in a markdown file
# Documentation format:
#   TITLE;DESCRIPTION;AUTHOR
def handle_markdown_documentation(file_path, json_object):
    # See if the first line has information on the file
    documentation_line = None
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
def directory_to_json(starting_directory):
    json_object = [] # Empty JSON object

    for (full_path, directories, files) in os.walk(starting_directory):
        # Remove ignored folders
        directories[:] = [directory for directory in directories 
            if directory not in IGNORED_FOLDERS]

        current_json = {
            "directory": full_path.split('/')[-1].capitalize()
        }
        
        files_in_directory = []
        sub_directories = []

        for file in files:
            if file.endswith('.md'):
                files_in_directory.append(output_file_json(file, full_path))

        for directory in directories:
            sub_directories.append(
                {"directory": directory.split('/')[-1].capitalize()}
            )

        # Check if directories and files exists, if so add them to the object
        if sub_directories:
            current_json['directories'] = sub_directories
        if files_in_directory:
            current_json['files'] = files_in_directory

        if (not json_object):
            # Create the root
            json_object = current_json
        else:
            # This is not the root, therefore find correct location
            # Exit if there is nothing here before it is appended
            if (not sub_directories and not files_in_directory):
                break

            folder_structure = full_path.split('/')

            json_pointer = json_object
            index = 0
            while (len(folder_structure) > 1):
                # While we are still checking folders
                current_search_target = folder_structure.pop(0) # Grab first
                for index, directory in enumerate(json_pointer['directories']):
                    if directory['directory'].lower() == current_search_target:
                        json_pointer = json_pointer['directories'][index]
                        break
            
            # Replace the empty JSON with the actual JSON
            json_pointer['directories'][index] = current_json

    return json_object


# Output a file
with open('data.json', 'w+') as outfile:
    json.dump(directory_to_json('.'), outfile, indent=2)
