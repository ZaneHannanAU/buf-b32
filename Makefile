#!/bin/make
DIST_FOLDER=dist
ESNEXT_EXTENSION=mjs

all: esnext umd autodefine .mkln

esnext:
	tsc -t ESNext -m ESNext
	for v in $(DIST_FOLDER)/*.js; do \
		sed \
			-e 's/.js.map/.$(ESNEXT_EXTENSION).map/g' \
			-e "s/from '\\(.\/[^']*\\)'/from '\\1.$(ESNEXT_EXTENSION)'/g" \
			-e "s/from '\\(..\/[^']*\\)'/from '\\1.$(ESNEXT_EXTENSION)'/g" \
			-e "s/import(\(['\"]\)\([^\1\]\)\1)/import(\\1\\2.$(ESNEXT_EXTENSION)\\1)/g" \
			-i "$$v" ; \
		mv "$$v" "$$(dirname "$$v")/$$(basename "$$v" .js).$(ESNEXT_EXTENSION)" ; done
	for v in $(DIST_FOLDER)/*.js.map; do \
		mv "$$v" "$$(dirname "$$v")/$$(basename "$$v" .js.map).$(ESNEXT_EXTENSION).map" ; done


autodefine:
	for v in $(DIST_FOLDER)/**.js; do \
		sed \
			-e "s/define(/define('$$(basename $$v '.js')', /g" \
			-i "$$v"; \
			done

umd:
	tsc -m umd -t ES2017

amd:
	tsc -m amd -t ES2017

cjs:
	tsc -m commonjs -t ES2017

none:
	tsc -m none 

.mkln:
	for v in $(DIST_FOLDER)/*.js $(DIST_FOLDER)/*.$(ESNEXT_EXTENSION) $(DIST_FOLDER)/*.js.map $(DIST_FOLDER)/*.$(ESNEXT_EXTENSION).map; do if [[ -f "$$v" ]]; then ln -sf "$$v" "./$$(basename "$$v")"; fi; done;
	if [[ "$(ESNEXT_EXTENSION)" != "mjs" ]]; then for v in $(DIST_FOLDER)/*.$(ESNEXT_EXTENSION); do if [[ -f "$$v" ]]; then ln -sf "$$v" "./$$(basename "$$v" .$(ESNEXT_EXTENSION)).mjs"; ln -sf "$$(basename "$$v")" "$$(dirname "$$v")/$$(basename "$$v" .$(ESNEXT_EXTENSION)).mjs"; fi; done; fi
	cp dist/b32.d.ts buf-b32.d.ts

clrsm:
	if [[ -d "$(DIST_FOLDER)" ]]; then rm -r "$(DIST_FOLDER)"; fi
	symlinks -rd .

git:
	git add .
	git commit -m make
	git push

commit: all git

include clrsm
