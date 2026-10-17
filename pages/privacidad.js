import Head from "next/head"
import React from "react"
import { sitename, sitedomain } from "../components/siteData"

const privacidad = () => {
  return (
    <div className="privacy-page">
      <Head>
        <title>Politica de Privacidad | {sitename}</title>
        <meta name="description" content={`Politica de Privacidad de ${sitename}. Conoce como protegemos tu informacion personal.`} />
        <link rel="canonical" href={`${sitedomain}/privacidad`} />
      </Head>
      <h1>POLITICA DE PRIVACIDAD</h1>
      <p>
        El presente Politica de Privacidad establece los terminos en que
        10datos.com usa y protege la informacion que es proporcionada por sus
        usuarios al momento de utilizar su sitio web. Esta compania esta
        comprometida con la seguridad de los datos de sus usuarios. Cuando le
        pedimos llenar los campos de informacion personal con la cual usted
        pueda ser identificado, lo hacemos asegurando que solo se empleara de
        acuerdo con los terminos de este documento. Sin embargo esta Politica de
        Privacidad puede cambiar con el tiempo o ser actualizada por lo que le
        recomendamos y enfatizamos revisar continuamente esta pagina para
        asegurarse que esta de acuerdo con dichos cambios. Informacion que es
        recogida Nuestro sitio web podra recoger informacion personal por
        ejemplo: Nombre, informacion de contacto como su direccion de correo
        electronica e informacion demografica. Asi mismo cuando sea necesario
        podra ser requerida informacion especifica para procesar algun pedido o
        realizar una entrega o facturacion. Uso de la informacion recogida
        Nuestro sitio web emplea la informacion con el fin de proporcionar el
        mejor servicio posible, particularmente para mantener un registro de
        usuarios, de pedidos en caso que aplique, y mejorar nuestros productos y
        servicios. Es posible que sean enviados correos electronicos
        periodicamente a traves de nuestro sitio con ofertas especiales, nuevos
        productos y otra informacion publicitaria que consideremos relevante
        para usted o que pueda brindarle algun beneficio, estos correos
        electronicos seran enviados a la direccion que usted proporcione y
        podran ser cancelados en cualquier momento. 10datos.com esta altamente
        comprometido para cumplir con el compromiso de mantener su informacion
        segura. Usamos los sistemas mas avanzados y los actualizamos
        constantemente para asegurarnos que no exista ningun acceso no
        autorizado. Cookies Una cookie se refiere a un fichero que es enviado
        con la finalidad de solicitar permiso para almacenarse en su ordenador,
        al aceptar dicho fichero se crea y la cookie sirve entonces para tener
        informacion respecto al trafico web, y tambien facilita las futuras
        visitas a una web recurrente. Otra funcion que tienen las cookies es que
        con ellas las web pueden reconocerte individualmente y por tanto
        brindarte el mejor servicio personalizado de su web. Nuestro sitio web
        emplea las cookies para poder identificar las paginas que son visitadas
        y su frecuencia. Esta informacion es empleada unicamente para analisis
        estadistico y despues la informacion se elimina de forma permanente.
        Usted puede eliminar las cookies en cualquier momento desde su
        ordenador. Sin embargo las cookies ayudan a proporcionar un mejor
        servicio de los sitios web, estas no dan acceso a informacion de su
        ordenador ni de usted, a menos de que usted asi lo quiera y la
        proporcione directamente. Usted puede aceptar o negar el uso de cookies,
        sin embargo la mayoria de navegadores aceptan cookies automaticamente
        pues sirve para tener un mejor servicio web. Tambien usted puede cambiar
        la configuracion de su ordenador para declinar las cookies. Si se
        declinan es posible que no pueda utilizar algunos de nuestros servicios.
        Enlaces a Terceros Este sitio web pudiera contener enlaces a otros
        sitios que pudieran ser de su interes. Una vez que usted de clic en
        estos enlaces y abandone nuestra pagina, ya no tenemos control sobre al
        sitio al que es redirigido y por lo tanto no somos responsables de los
        terminos o privacidad ni de la proteccion de sus datos en esos otros
        sitios terceros. Dichos sitios estan sujetos a sus propias politicas de
        privacidad por lo cual es recomendable que los consulte para confirmar
        que usted esta de acuerdo con estas. Control de su informacion personal
        En cualquier momento usted puede restringir la recopilacion o el uso de
        la informacion personal que es proporcionada a nuestro sitio web. Cada
        vez que se le solicite rellenar un formulario, como el de alta de
        usuario, puede marcar o desmarcar la opcion de recibir informacion por
        correo electronico. En caso de que haya marcado la opcion de recibir
        nuestro boletin o publicidad usted puede cancelarla en cualquier
        momento. Esta compania no vendera, cedera ni distribuira la informacion
        personal que es recopilada sin su consentimiento, salvo que sea
        requerido por un juez con un orden judicial. 10datos.com Se reserva el
        derecho de cambiar los terminos de la presente Politica de Privacidad en
        cualquier momento.
      </p>
    </div>
  )
}

export default privacidad
