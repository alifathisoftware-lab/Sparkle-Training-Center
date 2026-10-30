const fs=require('node:fs');
const esbuild=require('esbuild');
for(const name of ['index.html','style.css','app.js'])fs.copyFileSync('src/'+name,'dist/'+name);
esbuild.buildSync({entryPoints:['src/schedule.js'],bundle:true,minify:true,format:'iife',outfile:'dist/schedule.js',define:{'process.env.NODE_ENV':'"production"',__VUE_OPTIONS_API__:'true',__VUE_PROD_DEVTOOLS__:'false',__VUE_PROD_HYDRATION_MISMATCH_DETAILS__:'false'}});
console.log('Built Vue + Ant Design Vue timetable.');
