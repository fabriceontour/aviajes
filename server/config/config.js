//=======LE PORT ============================================================
process.env.PORT = process.env.PORT || 3000;
process.env.HOST = process.env.HOST || '0.0.0.0';

//========= L'environement. Production ou local =============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//========= Base de datos ===================================================
let hostDB, nombreDB, userDB, passDB, portDB;
if(process.env.NODE_ENV === 'dev'){
    hostDB = 'localhost';
    nombreDB = 'agenciaviajes';
    userDB = 'root';
    passDB = '';
}else{
    urlDB = 'localhostprod';
}

process.env.HOSTDB = hostDB;
process.env.NOMBREDB = nombreDB;
process.env.USERDB = userDB;
process.env.PASSDB = passDB;