// Copyright (c) 2022 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed "dist/*"
var files embed.FS

func main() {
	filesystem, err := fs.Sub(files, "dist")

	if err != nil {
		log.Fatal(err)
	}

	fileServer := http.FileServer(http.FS(filesystem))
	mux := http.NewServeMux()

	mux.Handle("/", fileServer)

	log.Println("Starting server on port 4000")

	log.Fatal(http.ListenAndServe(":4000", mux))
}
