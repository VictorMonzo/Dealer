# App Dealer

## Descripción del proyecto
Esta aplicación web está creada para ser usada por los repartidores de la tienda online Sneak.

En ella los repartidores (dealers) pueden hacer login con su cuenta de repartidor y ver una tabla con todos los pedidos que tienen pendientes por repatir. Además, los repartidores pueden modificar estos pedidos para indicar su estado de reparto.


## Instalación del proyecto y despliegue
1. Git clone del repositorio
2. Crear una rama, programar en ella y en terminar subirla
3. Ejecutar comando 
        ``
          sh dealer.sh
        ``
## Ip de la máquina y políticas de seguridad aplicadas (Puertos abiertos)
###### IP pública 
34.207.156.33

###### Puertos de seguridad
![Puertos de seguridad](/imgs/puertosSeguridad.png)

## Servicios y versiones instaladas
###### Servicio Nginx
![Versión Nginx](/imgs/versionNginx.png)

###### Servicio ssh
![Versión SSH](/imgs/versionSSH.png)

## Usuarios creados y privilegios asignados
Hemos creado el usuario *dealer* con los siguiente privilegios:

Carpeta   | Privilegios 
--------- | ----------- 
/var/www/dealer/html  | 755

A parte de este usuario tabmién se ha creado automaticamente el usuario *ubuntu* tiene aceso a todas las carpetas de la instancia como root.

## URL de la página web desplegada
reparto.g06.batoilogic.es

## Desplegamiento de la web
![Despliegue web](/imgs/despliegueWeb.png)
