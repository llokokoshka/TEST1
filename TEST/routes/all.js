const {Router} = require('express')
const multer  = require("multer");
const test = require('../models/test')
const { db } = require('../models/test')
const answer = require('../models/answer')
const { dbb } = require('../models/answer')
const resullt = require('../models/results')
const { dbbb } = require('../models/results')
const news = require('../models/news')
const { dbbbb } = require('../models/news')
const photos = require('../models/photos')
const { dbbbbb } = require('../models/photos')
const upload = require('../middlewear/ulpoad')
const express = require('express')
const mongoose = require('mongoose')  
const Db = mongoose.connection;
const router = Router();
var result;

var TestID;
var TestName;

router.get('/', async(req, res) => {          //страница с ссылками|кнопками на тесты
    const all = await test.find({});
    res.render('pagemain', {
        title: 'Tests',
        isIndex: true,
        all
     })
})

router.post('/', async(req, res) => {          //обработка нажатия на кнопку с именем теста
    TestID = req.body.id;  
    console.log(TestID);
    res.redirect('/tests');
})

router.get('/tests', async (req, res) => {     //страница с тестами
    const all = await test.find({"_id":TestID});
    //console.log("===========================================================");
  //  console.log(all);
    res.render('index', {
       title: 'Test',
       isIndex: true,
       all
    })
})

router.get('/create', async (req, res) => {       //страница с созданием тестов
    res.render('create', {
        title: 'Create test',
        isCreate: true
    })
})

router.get('/result', async(req, res) => {          //результат
    res.render('result', {
        result
     })
})

router.post('/result', async(req, res) => {          //результат
    res.redirect('/')
})

router.post('/create', upload.array("filedata", 20), async (req, res) => {      //обработчик создания тестов
    if (req.body.questions && req.body.answers && req.body.answer){
        var n = req.body.answer;
        console.log(n);
        if (Array.isArray(n)){
            var N = n.length;
            console.log(N);
        }  //
        else {
            var N = 1;
        }
        if (N <= 2){
            console.log("Количество вопросов слишком мало!");
            res.redirect('/create');
        } else {
            var QQQQ = [];
            console.log(req.files)
            for (let j = 0; j<N; j++){
                
                if (req.files[j]) {
                    var filedata = req.files[j].path
                } else {
                   var  filedata = ''
                }
                //console.log(filedata)
                QQQQ[j] = {textOfQuestion: req.body.questions[j], answers: req.body.answers[j], imageSrc: filedata };
            }
            //console.log(QQQQ);
        
            const tesst = new test ({
            name: req.body.name,
            questions: QQQQ
            });
            console.log("===========================================================");
           // console.log(tesst);
            await tesst.save()
            
            var AAAA = [];
            for (let j = 0; j<N; j++){
                AAAA[j] = req.body.answer[j];
            }
            // console.log(AAAA);

            const Answ = new answer ({
                name: req.body.name,
                answers: AAAA
            })
            await Answ.save()

            res.redirect('/');
        }
    }
   // res.redirect('/create');
})

router.post('/complete', async (req, res) => {   //обработчик выполненого теста
    var mas = [];
    mas = req.body.answer;
    console.log(mas);
    TestName = await test.find({"_id":TestID});
   // console.log(TestName[0]["name"]);
    var Answers = await answer.find({name: TestName[0]["name"]});     //ответы на тест в бд
   // console.log(Answers);
   // console.log("===========================================================");
    result = 0;
    for ( let i=0; i<Answers.length; i++){
        for (let j in Answers[i]){
            if (j=="answers"){
                for (let k = 0; k<Answers[i][j].length; k++){
                    if (Answers[i][j][k] == mas[k]){
                        result +=1;
                       // console.log(result);
                    }
                }
            }
        }
    }
    console.log("===========================================================");
    console.log(result);
    const ressult = new resullt ({
        points: result,
        });
   // await ressult.save();
    res.redirect('/result')
   // res.redirect('/tests')
})

router.get('/news', async(req, res) => {          //страница с новостями
    const newss = await news.find({});
    res.render('news', {
        title: 'News',
        isNews: true,
        newss
     })
})

router.post('/CreateNewss', async(req, res) => {          //страница с созданием новостей
    res.render('createNews', {
        title: 'Create news',
        isNews: true
    })
})

router.post('/CreateNews', upload.single("filedata"), async (req, res) => {      //обработчик создания новостей
    if (req.body.textOfNews && req.body.Header){ 
        //console.log(req.body.textOfNews)
        const newws = new news ({
            Header: req.body.Header, 
            textofNews: req.body.textOfNews,
            imageSrc: req.file.path
        });
        console.log("===========================================================");
        await newws.save()
    }
    res.redirect('/news');
})

router.get('/photo', async(req, res) => {          //страница с фото
    const photoss = await photos.find({});
    res.render('photos', {
        title: 'Photos',
        isPhoto: true,
        photoss
     })
})
router.post('/CreatePhotoss', async(req, res) => {          //страница с добавлением фото
    res.render('createPhotos', {
        title: 'Create photoss',
        isPhoto: true
    })
})

router.post('/CreatePhotos', upload.single("PHOTO"), async (req, res) => {      //обработчик добавления фото
    if (req.file){
        const photoss = new photos ({
            imageSrc: req.file.path
        });
        await photoss.save()
    }
    
    res.redirect('/photo');
})

module.exports = router