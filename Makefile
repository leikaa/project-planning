#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

# include .env
# export

SHELL = /bin/sh

# COPY_ENV = [ -f .env ] || cp $(pwd)/.env.example $(pwd)/.env

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "\n  Allowed for overriding next properties:\n\n\
		Usage example:\n\
	    	make up"


init: back-npm front-npm build-all ## init project

build: ## rebuild all containers
	$(docker_compose_bin) build

up: build ## rebuild and up all containers
	$(docker_compose_bin) -f docker-compose$(if $(MODE_COMPOSE),-$(MODE_COMPOSE),).yml up -d --remove-orphans

down: ## down all containers
	$(docker_compose_bin) down

restart: build down up ## rebuild and restart all containers

stop: ## stop all containers
	@$(docker_bin) ps -aq | xargs $(docker_bin) stop

# --- [ Front ] -------------------------------------------------------------------------------------------------
build-all: front-build ## build all scripts from source

front-build: ## build front
	cd src/front && npm run build

front-dev: ## run dev server
	cd ./src/front && npm run dev

front-npm: ##npm install front
	@cd ./src/front && npm install
  
# # --- [ Backend ] -------------------------------------------------------------------------------------------------

back-npm: ## npm install for webserver
	@cd ./src/back && npm install
