import mysql from 'mysql2'

class ConexaoDB {
    //Conexão com MySQL
    static connect(){
        const connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'admin',
            database:'fatec'
        })
        connection.connect()
        return connection
    }
    //selecionat todos os estudantes
    static getAllStudents(callback){
        let connection = ConexaoDB.connect()
        //Criar uma consulta
        let sql = "select * from student"
        let query = connection.query(sql, function(error, results, fields){
            if(error) throw error
            //retornar os dados
            callback(results)
        })
            console.log(query.sql)
            //fechar a conexão
            connection.end()

    }

    //Seleção por nome
    static getStudentsByName(nome, callback){
        let connection = ConexaoDB.connect()
    
        //criar a consulta
        let sql = "select * from student where nome = '" + nome + "'"
        let query = connection.query(sql, function(error, results, fields){
            if(error) throw error
            //seleciona por nome
            callback(results)
        })
          console.log(query.sql)
          //fecha a conexão
          connection.end()
    }
    //salva dados
    static save(student, callback){
        let connection = ConexaoDB.connect()
        //Criar a consulta
        let sql = "insert into student set ?"
        let query = connection.query(sql, student, function(error, results, fields){
            if(error) throw error
            //Inserir no BD
            student.id = results.insertId
            callback(student)
        })
            console.log(query.sql)
            //fecha conexão
            connection.end()
    }

    //Atualizar
    static update(student, callback){
        let connection = ConexaoDB.connect()

        //SQL de atualização
        let sql = "update student set ? where id = ?"

        //id de atualização
        let id = student.id
        let query = connection.query(sql, [student,id], function(error, results, fields){
            if(error) throw error
            callback(student)
        })
            console.log(query.sql)
            //fechar conexão
            connection.end()
    }

    //Apagar
    static delete(id, callback){
        let connection = ConexaoDB.connect()

        //apagar por id
        let sql = "delete from student where id = ?"
        let query = connection.query(sql, id, function(error, results, fields){
            if(error) throw error
            callback(id)
        })
            console.log(query.sql)
            //fecha conexão
            connection.end()
    }

}

export default ConexaoDB