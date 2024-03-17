
# Desafio 2024
Objetivo desse desafio é praticar e estudar uso do paraparadigmas de programação Orientada a Objeto.

# Docker Compose
Foi configurado um docker compose, para poder usar tera que fazer umas configurações.
Com docker instalado em sua maquina, abrar o terminal da pasta do projeto.

- linux
```bash
 docker compose up
```
- Caso seja windows
```bash
docker-compose up
```

- Com docker funcionando instalei o PDO no php/apache
```bash
docker compose exec apache-php docker-php-ext-install pdo pdo_mysql mysqli
```

- Depois reincie o docker

```bash
docker compose  stop
```
- Reinicie o docker 

```bash
docker compose start
```

# Região
Sul: -4 pontos
Sudeste: -1 ponto, exceto quando unidade = São Paulo (que não modifica)
Centro-Oeste: -3 pontos
Nordeste: -2 pontos
Norte: -5 pontos
# Idade
A partir de 100 ou menor que 18: -5 pontos
Entre 40 e 99: -3 pontos
Entre 18 e 39: não modifica

