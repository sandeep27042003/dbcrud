import pg from 'pg';
const{Pool}=pg;
//instanace for pool
export const pool=new Pool({
    user:'postgres',
    password:'2003',
    host:'localhost',
    port:5433,
    database:'steama_testdb'
});