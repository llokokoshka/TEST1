const express = require('express')
const mongoose = require('mongoose')                                        //подключение монгодб
const exphbs = require('express-handlebars')                                //html-движок
const path = require('path')
const { set } = require('express/lib/application')
const allRoutes = require('./routes/all')
const  Handlebars  =  require ( 'handlebars' ) 
const  { allowInsecurePrototypeAccess }  =  require ( '@handlebars/allow-prototype-access' )
var n = 0;
var DB = mongoose.connection;

const PORT =process.env.PORT || 3000  
const app = express()
const hbs = exphbs.create({                                                 //настраиваем конфигурации для будущего шаблонизатора
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)                                                //движок создаем для рендеринга
app.set('view engine', 'hbs')                                                //используем движок
app.set('views', 'views')                                                    //регистрация видов 

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname))
app.use('/uploads', express.static('uploads'))
app.use(allRoutes)




async function start() {
    try{  
        await mongoose.connect( 'mongodb+srv://lokokoshka:1710@cluster0.szfi0.mongodb.net/Tests', { 
            useNewUrlParser: true,
           // useUnifiedTopology: true
        })
        app.listen(PORT, () =>{                                                  //запуск сервера
            console.log('Server has been started...')
        })
    } catch (e) {                                                                //ошибка
        console.log(e)
    }
}

start()