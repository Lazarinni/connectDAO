import connDAO from './conexao.js'

function pegaTodos(){
connDAO.getAllStudents(function(students){
    //imprimir os estudantes
    for(let i=0;students.length > i; i++){
        console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email)
    }
})
}

//Pega por nome
function pegaPorNome(nome){
    connDAO.getStudentsByName(nome, function(students){
        for(let i=0;students.length > i; i++){
            console.log(students[i].id + ":" + students[i].nome + ":" + students[i].email)
        }
 })
        
}
//Insere novo cadastro
function cadastrar(nome, email){
    let student = {nome:nome, email:email}
    connDAO.save(student, function(student){
        //imprime o que salvou
        console.log("Estudante cadastrado!" + student.id + ":" + student.nome + ":" + student.email)
    })
}

//Atualizar
function atualizar(id, nome, email){
    let student = {id:id, nome:nome, email:email}
    connDAO.update(student, function(student){
        //Imprime os dados atualizados
        console.log("Dados atualizados!" + student.id + ":" + student.nome + ":" + student.email)
    })
}

//Apagar
function apagar(id){
    let student = {id:id}
    connDAO.delete(student, function(student){
        //imprime confirmação
        console.log("Deletado!" + student.id)
    })
}








