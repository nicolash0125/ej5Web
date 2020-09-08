{
  
  console.log("Ej5Web Nicolas Hernandez Siachoque 201716434")
  var urlPedidos = 'https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json'

  var urlProductos = 'https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json'

  
  function promesa(url) { return new Promise( function(resolve, reject) 
    {
      let req = new XMLHttpRequest();
      req.open('GET',url)
      req.onload = function(){
        if(req.status == 200){
          resolve(req.response);
         }
        else{
          reject(Error(req.statusText));
         }
       }
      req.onerror = function() {
        reject(Error("Network Error"));
      };
      req.send()


   });
  }
  
  promesa(urlPedidos).then(function(response) {
    console.log("Datos pedidos OK");
    var pedidos = JSON.parse(response);
    var max = null;
    var productoPedido=[];
    for(var i=0;i<pedidos.length;i++){
      if(productoPedido[ pedidos[i]["idproducto"] ]==null){
        productoPedido[ pedidos[i]["idproducto"] ]= {"Cantidad":parseInt(pedidos[i]["cantidad"]),"NumPed":"1"}
      }
      else{
        //console.log(parseInt(pedidos[i]["Cantidad"]))
        productoPedido[ pedidos[i]["idproducto"] ]={
        "Cantidad":parseInt(productoPedido[ pedidos[i]["idproducto"] ].Cantidad)+parseInt(pedidos[i]["cantidad"])
          ,"NumPed":parseInt(productoPedido[ pedidos[i]["idproducto"] ].NumPed)+1
        }
      }
    }
    //console.log(productoPedido)
    
    var idProdMax=-1
    for (var i=0; i<productoPedido.length; i++){
      if (max == null || parseInt(productoPedido[i]["Cantidad"]) > parseInt(max["Cantidad"])){
        max = productoPedido[i]
        idProdMax=i
      }
            
    }
    //console.log(max)
    //console.log(idProdMax)
    var pedidoMaximo= idProdMax;
    promesa(urlProductos).then(function(response2){
      console.log("Datos productos OK")
      var productos = JSON.parse(response2);
      var productoMasVendido=null
      for (var j=0; j<productos.length; j++){
        if(productos[j].idproducto == pedidoMaximo){
          productoMasVendido=productos[j]
          //console.log(productos[j])
        }
      }
      console.log("Nombre producto mas vendido: "+productoMasVendido.nombreProducto)
      console.log("Cantidad de veces que se ha pedido: "+max.NumPed)
      console.log("Total ventas: "+max.Cantidad)
      return productoMasVendido
    })
    }, 
    function(error) {
    console.error("ERROR", error);
})   

}


