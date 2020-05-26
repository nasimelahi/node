const express = require('express');
const router = express.Router();
const members = require('../../members/Members');
const uuid = require('uuid');

router.get('/',(req,res)=>{
    res.json(members)
});

// Get single member
router.get('/:id',(req,res)=>{
    const found = members.some(member =>  member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member =>  member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({"msg":`No Member found with this id of ${req.params.id}`})
    }

    
});

// post route

router.post('/', (req,res) => {
   let newMember = {
       id: uuid.v4(),
       name: req.body.name,
       email: req.body.email
   }
   if(!newMember.name || !newMember.email){
       return res.status(400).json({ "msg":"plese enter the name and email"  })
   }

   members.push(newMember);
   res.send('/');
});

//update Member

router.put('/:id',(req,res)=>{
    const found = members.some(member =>  member.id === parseInt(req.params.id));

    if(found){
        let upMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = upMember.name ? upMember.name : member.name;
                member.email = upMember.email ? upMember.email : member.email;
                res.json({ msg: 'Member updated', member});
            }
        });
    }else{
        res.status(400).json({"msg":`No Member found with this id of ${req.params.id}`})
    }

    
});

//Delete member
router.delete('/:id',(req,res)=>{
    const found = members.some(member =>  member.id === parseInt(req.params.id));

    if(found){
        res.json({msg:"Member delated", members: members.filter(member =>  member.id!== parseInt(req.params.id))});
    }else{
        res.status(400).json({"msg":`No Member found with this id of ${req.params.id}`})
    }

    
});


module.exports = router;