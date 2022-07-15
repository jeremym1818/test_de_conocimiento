const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/addG', (req, res) => {
    res.render('gestion/addG');
});

//Agregar Gestion
router.post('/addG', async (req, res) => {
   var  result = false
    const { name,aplica } = req.body;


//Ingresamos Gestiones Desde Consola
    //Buscamos si existe 
    const existe = await pool.query('SELECT * FROM gestion WHERE name = ?', [name]);

    //si es mayor q sero es por que encontru una gestion con ese Nombre
  if(existe != 0){
    if (existe[0].name == name) {
        req.flash('success', 'La Gestion Ya Existe');
        res.redirect('/gestion/addG');
    } 
  }
  else {//caso contrario no encontro
    if(aplica=='SI'){
        result = true
    }else{
         result = false
    }
    const newgestion = {
        name,
        aplica:result,
        user_id: req.user.id
    };
    console.log(newgestion)
    await pool.query('INSERT INTO gestion set ?', [newgestion]);
    req.flash('success', 'Gestion Agregada Exitosamente');
    res.redirect('/gestion');
}

});

//Mostrar Gestiones
router.get('/', isLoggedIn, async (req, res) => {
    const gestiones = await pool.query('SELECT * FROM gestion WHERE user_id = ?', [req.user.id])
    res.render('gestion/listG', {gestiones });

    
//Ingresamos Gestiones Por defecto
const defecto = await pool.query('SELECT * FROM gestion WHERE name = ? ', ['Arreglo De Pago']);
const defecto2 = await pool.query('SELECT * FROM gestion WHERE user_id = ?', [req.user.id]);

if(defecto != 0 && defecto2 !=0){
      console.log('Gestiones Por defecto Ya estan Agregadas')
  }
  else {//caso contrario no encontro
    const newGF1 = {
        name:'Arreglo De Pago',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF1]);
    console.log('Gestiones Por defecto Agregada con exito')

    //gestion por defecto 2
    const newGF2 = {
        name:'Cancelacion',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF2]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 3
     const newGF3 = {
        name:'Compra',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF3]);
    console.log('Gestiones Por defecto Agregada con exito')
    
     //gestion por defecto 4
     const newGF4 = {
        name:'Nuevo Servicio',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF4]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 5
     const newGF5 = {
        name:'Reclamo',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF5]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 6
     const newGF6 = {
        name:'Reclamo',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF6]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 7
     const newGF7 = {
        name:'Renovacion',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF7]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 8
     const newGF8 = {
        name:'Soporte Tecnico',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF8]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 9
     const newGF9 = {
        name:'Devolucion',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF9]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 10
     const newGF10 = {
        name:'Consulta',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF10]);
    console.log('Gestiones Por defecto Agregada con exito')

     //gestion por defecto 11
     const newGF11= {
        name:'Reclamo',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF11]);
    console.log('Gestiones Por defecto Agregada con exito')

    //gestion por defecto 11
    const newGF12= {
        name:'ReemPlazo',
        aplica:false,
        user_id: req.user.id,
    };
    await pool.query('INSERT INTO gestion set ?', [newGF12]);
    console.log('Gestiones Por defecto Agregada con exito')
}
});

//Eliminar gestion
router.get('/deleteG/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM gestion WHERE ID = ?', [id]);
    req.flash('success', 'Gestion Eliminada Exitosamente');
    res.redirect('/gestion');
});

//Editar Gestion

router.get('/editG/:id', async (req, res) => {
    const { id } = req.params;
    const gestiones = await pool.query('SELECT * FROM gestion WHERE id = ?', [id]);

    res.render('gestion/editG', {gestion: gestiones[0]});
});

router.post('/editG/:id', async (req, res) => {
    var result = false
    const { id } = req.params;
    const { name, aplica} = req.body; 

    if(aplica=='SI'){
        result = true
    }else{
         result = false
    }

    const newgestion = {
       name,
       aplica:result
    };
    await pool.query('UPDATE gestion set ? WHERE id = ?', [newgestion, id]);
    req.flash('success', 'gestion Actualizada exitosamente');
    res.redirect('/gestion');
});


//Realizar Gestion

router.get('/nuevaG', async(req, res) => {
    const tgestiones = await pool.query('SELECT * FROM gestion WHERE user_id = ?', [req.user.id]);
    res.render('gestion/nuevaG',{tgestiones});
});


router.post('/nuevaG', async(req, res) => {
    const {gestion} = req.body;

    //buscamos esa gestrion en la base de datos 
    const gestionE = await pool.query('SELECT * FROM gestion WHERE name = ?', [gestion]);

    const gcliente = {
        gestion_id:gestionE[0].id,
        atendido:'NO Atendido',
        user_id: req.user.id,
        nombreG :gestion,
    };
    await pool.query('INSERT INTO gestioncliente set ?', [gcliente]);
    req.flash('success', 'Gestion Cliente  Realizada Exitosamente');
    res.redirect('/gestion/gestionC');

 });

 //Mostrar Gestiones-Clientes
router.get('/gestionC', isLoggedIn, async (req, res) => {
    const gestionesC = await pool.query('SELECT * FROM gestioncliente WHERE user_id = ?', [req.user.id]);
    res.render('gestion/listaGC', {gestionesC});
});

//Eliminar gestion
router.get('/deleteGC/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM gestioncliente WHERE ID = ?', [id]);
    req.flash('success', 'Gestion Cliente Eliminada Exitosamente');
    res.redirect('/gestion/gestionC');
});


 //exportamos
module.exports = router;