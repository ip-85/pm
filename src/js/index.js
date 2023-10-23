const user = require('./user');
const project = require('./project');


const newUser = new user('Igor', 'igor@gmail.com', new Date(), '12345')
newUser.insert();

(async () => {
    const user = await user.Find(1)
    console.log(`${user.name} with id ${user.id}`)
})();

(async () => {
    const users = await User.All()
    users.forEach( user => {
      console.log(`${user.name} with id ${user.id}`)  
    })
})();

const newProject = new project('Landding page', 'Create a new design of main page with video', '20.05.2020', '30.05.2020')

newProject.update();