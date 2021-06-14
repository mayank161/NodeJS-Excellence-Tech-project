// creating a user post user details in the backend
async function createUser(e) {
    const parent = e.target.parentElement;
    const name = parent.children[0].children[1].value;
    const email = parent.children[1].children[1].value;
    const address = parent.children[2].children[1].value;
    console.log(name,email,address);
    
    if(!parent || !name || !address) { return alert('do not leave any field empty'); }
    try {
        const user = await axios.post('http://localhost:3000/candidate',{
        name: name, email:email, address: address });

        console.log(user.data.id)
        localStorage.setItem("userId",user.data.id);  

    } catch (error) {
        alert('Email already exist');
    }
}

// new user can add new test score in database while old can update
async function testScore(e) {
         const userId = JSON.parse(localStorage.getItem('userId'))
         if(!userId) { return alert('please fill the user detail first');}

         const parent = e.target.parentElement;
         const test1 = parseInt(parent.children[0].value);
         const test2 = parseInt(parent.children[1].value);
         const test3 = parseInt(parent.children[2].value);
         
         if(test1>10||test2>10||test3>10||test1<0||test2<0||test3<0) {
            return alert('testScore must be in the range of 0 to 10')
         }
         if(!test1 || !test2 || !test3) { return alert('test should not be null')}

         try {
             const total = test1 + test2+ test3;
             console.log(userId)
             const test = axios.post(`http://localhost:3000/${userId}/test`, {
                 test1: test1, test2: test2, test3: test3, total: total
             });

         } catch (error) {
             alert('something went wrong');
         }
    }

    // finding the total maximum until now
    async function findMax() {
        const put = document.getElementById('max');
        try {
            const max = await axios.get('http://localhost:3000/max');
            const data = max.data.max[0].max;
            if(data == null) { return put.innerHTML = 'test database is empty please fill your scores'}
            put.innerHTML = max.data.max[0].max;
            console.log(max.data.max[0].max)
        } catch (error) {
            alert('something went wrong');
        }
    }

    // finding the average of all the tests separately
    async function findAverage() {
        const put = document.getElementById('avg');
        try {
            const avg = await axios.get('http://localhost:3000/avg');
            // const data = (avg.data.avg[0].avg) % 10
            console.log(avg.data.t1[0].avg)
            const t1 = avg.data.t1[0].avg;
            const t2 = avg.data.t2[0].avg;
            const t3 = avg.data.t3[0].avg;
          
            if(!t1 || !t2 || !t3) { return put.innerHTML =  'test database is empty please fill your scores'}
            put.innerHTML = `average of test1 = <B>${t1.substring(0, 4)}</B>, test2 = <B>${t2.substring(0, 4)}</B>, test3 = <B>${t3.substring(0, 4)}</B>`;
        } catch (error) {
            console.log(error);
        }
    }