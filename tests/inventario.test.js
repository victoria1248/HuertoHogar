import assert from 'node:assert/strict'
import { leerInventario, guardarInventario, CLAVE_INVENTARIO } from '../src/servicios/inventario.js'
const datos = new Map()
globalThis.localStorage = {getItem:k=>datos.get(k)??null,setItem:(k,v)=>datos.set(k,v)}
globalThis.window = new EventTarget()
globalThis.StorageEvent = class extends Event { constructor(type,options){super(type);Object.assign(this,options)} }
let eventos=0
window.addEventListener('inventarioActualizado',()=>eventos++)
let lista=leerInventario()
assert.equal(lista.length,7)
guardarInventario([...lista,{id:99,nombre:'Peras',categoria:'Frutas',precio:5000,stock:20,unidad:'kilo',plural:'kilos',descuento:true,descuentoPorcentaje:20}])
let peras=leerInventario().find(p=>p.id===99)
assert.equal(Math.round(peras.precio*(1-peras.descuentoPorcentaje/100)),4000)
assert.equal(peras.stock,20)
guardarInventario(leerInventario().map(p=>p.id===99?{...p,stock:p.stock-3}:p))
assert.equal(leerInventario().find(p=>p.id===99).stock,17)
assert.equal(leerInventario().find(p=>p.id===99).descuentoPorcentaje,20)
guardarInventario(leerInventario().filter(p=>p.id!==1))
assert.ok(!leerInventario().some(p=>p.id===1))
guardarInventario([])
assert.deepEqual(leerInventario(),[])
assert.equal(eventos,4)
assert.ok(datos.has(CLAVE_INVENTARIO))
console.log('Correcto: inventario del archivo, descuento 20%, stock, persistencia y eliminación.')
