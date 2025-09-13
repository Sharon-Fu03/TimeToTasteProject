const http = require('http');
const https = require('https');

function fetch(url, options = {}){
  return new Promise((resolve,reject)=>{
    const lib = url.startsWith('https') ? https : http;
    const u = new URL(url);
    const req = lib.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', ()=> resolve({statusCode: res.statusCode, body}));
    });
    req.on('error', reject);
    if(options.body) req.write(options.body);
    req.end();
  })
}

(async ()=>{
  try{
    console.log('GET /hello ...');
    const r1 = await fetch('http://localhost:8080/hello');
    console.log('STATUS', r1.statusCode);
    console.log('BODY', r1.body);
  }catch(e){
    console.error('GET ERROR', e && e.message);
  }

  try{
    console.log('POST /getIngredient ...');
    const payload = JSON.stringify({ingredientName:'test', gram:100});
    const r2 = await fetch('http://localhost:8080/getIngredient',{method:'POST', headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(payload)}, body: payload});
    console.log('STATUS', r2.statusCode);
    console.log('BODY', r2.body);
  }catch(e){
    console.error('POST ERROR', e && e.message);
  }
})();
