<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```
npm i
```

3. Tener nest cli instalado
```
npm i -g nest/cli
```

4. levantar la base de datos
```
docker-compose up -d
```

5. clonar el archivo __.env.template__
y renombrar a __.env__


6. llenar variables de entorno definidas en ```.env```


7. ejecutar el comando ```npm run start:dev```

## stack usado
* MongoDB
* NestJs

# Build Productiopn
1.Crear archivo 
```
.env.prod
```
2. llenar las variables de entorno de prod

3. crear la nueva imagen 
``` 
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. levantar la imjagen 
``` 
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

#### Documentacion de mongo con nestjs:
* https://docs.nestjs.com/techniques/mongodb