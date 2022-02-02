const {Project} = require('@/models')
const {projectSchema_create} = require('@/validations/projects.validations')
const {error} = require('@/utils')


module.exports = {
    index: async (req,res) => {
        try{
            const projects = await Project.find({})
            res.send(projects)
        }
        catch(err){
            error(res,'Projects Extraction Error','Something went wrong during extraction process.',err,401)
        }
    },
    save: async (req,res) => {
        try{
            const result = await projectSchema_create.validateAsync(req.body,{abortEarly:false})

            const project =new Project(result)
            const savedProject = await project.save()
            res.send({"msg":'Successfully saved'})
        }
        catch(err){
            var status = 400
            if (err.isJoi === true) status = 422
            error(res,'Project Creation Error','Something went wrong during creation of project.',err,status)
        }
    },
    // UNRESOLVED ISSUE
    update: async (req,res) => {
        try{
            const result = await projectSchema_create.validateAsync(req.body,{abortEarly:false})
            const updatedProject = await Project.findOneAndUpdate(req.params.id,result,{new:true})
            res.send(updatedProject)
        }
        catch(err){
            var status = 400
            if (err.isJoi === true) status = 422
            error(res,'Project Update Error','Something went wrong during updation of project.',err,status)
        }
    },
    delete: async (req,res) => {
        try{
            const project = await Project.findByIdAndDelete(req.params.id)
            res.send("Successfully Deleted")
        }
        catch(err){
            error(res,'Project destruction Error','Something went wrong during destruction of project.',err,400)
        }
    },
    show: async (req,res) => {
        try{
            const project = await Project.findById(req.params.id)
            res.send(project)
        }
        catch(err){
            error(res,'Project Extraction Error','Something went wrong during extraction process.',err,401)
        }
    }
}