var fs   = require( 'fs' );
var http = require( 'http' );


var w = 1280;
var h = 720;

var posR = [];//holds positions of red player
var posB = [];//holds positions of blue player


function getFormValuesFromURL( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    if( parts.length === 2 )
    {
        var key_value_pairs = parts[1].split( "&" );
        for( var i = 0; i < key_value_pairs.length; i++ )
        {
            var key_value = key_value_pairs[i].split( "=" );
            kvs[ key_value[0] ] = key_value[1];
        }
    }
    return kvs
}


function serverFile( req, res )
{
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
        return true;
    }
    catch( exp ) {
        return false;
    }
}


function serverDynamic(req, res)
{
    var kvs = getFormValuesFromURL(req.url);

    if (req.url.indexOf("send_posR?") >= 0)
    {   res.writeHead(200);
        res.end("");
        console.log(kvs);
        posR.push(kvs);
        //need to find a way to push elements of the array into a database 
        
  
    }
    else if(req.url.indexOf("send_posB?") >=0)
    {
        res.writeHead(200);
        res.end("");
        console.log(kvs);
        posB.push(kvs);
        
    }

}

function serverFun( req, res )
{
    //console.log( "The URL: '", req.url, "'" );
    var file_worked = serverFile( req, res );
    if( file_worked )
        return;

    serverDynamic( req, res );
}



var server = http.createServer( serverFun );

server.listen( 8080 );