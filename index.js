const express=require('express');
const app=express();
const port=3000


const admin=require("firebase-admin");
const credetials=require("serviceKeyAccount.json")

admin.initializeApp({credential:admin.credential.cert(credetials)});

    app.get('/login', async(req, res) => {
        try {
            const {email, password} = req.body;
             await firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                firebase.firestore()
                    .collection('students')
                    .where('email', '==', email)
                    .get()
                .then((users) => {
                    let value = users.docs[0].data();
                    res.json(value);
                });
            });
        } catch (err) {
            return res.status(400).send({ message: err.message });
        }
    });
   


    app.post('/create-user', (req, res) => {
        const {name, email, password } = req.body;
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firebase.firestore().collection("users").doc().set({
                    "name": name,
                    "email": email,
                })
                .then(() => {
                    res.send('User created successfully');
                });
            })
            .catch(err => {
                res.send(err);
            });
    });


        app.put('/update-user', async(req, res) => {
            const {name, email, phoneno, location } = req.body;
            let found=data.find(function(users){
                return isGcsTfliteModelOptions.id===parseInt(req.params.id);
            });

            if (found){
                let update={
                    email:req.body.email,
                    password:req.body.password
                };
                res.sendStatus(204);
            }else{res.sendStatus(404)
            }
                
            });

        app.delete('/delete-user', async(req, res) => {
            const {email} = req.body;
            await firebase.firestore()
            .collection('users')
            .where('email', "==", email)
            .delete()
            .then((ref) => {
                res.json(ref.data());
            });
        });





app.listen(3000);