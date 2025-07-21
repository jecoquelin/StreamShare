#!/bin/bash

# Vérification des arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <video.mkv>"
    exit 1
fi

VIDEO_INPUT="$1"
FILENAME=$(basename -- "$VIDEO_INPUT")
NAME="${FILENAME%.*}"
OUTPUT_DIR="../videos/$NAME/"

# Création du dossier
mkdir -p "$OUTPUT_DIR"

# Conversion HLS sans transcodage et sans les sous-titres

ffmpeg -i "$VIDEO_INPUT" -map 0:v -map 0:a -c copy \
-start_number 0 \
-hls_time 10 \
-hls_list_size 0 \
-f hls "$OUTPUT_DIR/playlist.m3u8"

echo "✅ HLS rapide terminé ! Fichiers dans : $OUTPUT_DIR"
