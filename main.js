class HashMap{
    constructor(){
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;       
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    } 

    set(key, value){
        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const hashCode = this.hash(key);
        if(!this.buckets[index]){
            this.buckets[index] = new Linkedlist();
        }

        const existingNode = this.buckets[index].find(key);
        if (existingNode) {
            existingNode.value[1] = value; 
        } else {
            this.buckets[index].append([key, value]); 
            this.size++;
        }

        if(this.size / this.capacity > this.loadFactor){
            this.resize();
        }
    }

    resize(){
        const oldEntries = this.entries();
        this.capacity = this.capacity *2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
        
        oldEntries.forEach(([key, value]) => {
            this.set(key, value);
        });
    }

    get(key){
        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
          
        const existingNode = this.buckets[index].find(key);
        if(existingNode){
            return existingNode.value[1];
        } else{
            return null;
        }
    }

    has(key){
        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        const bucket = this.buckets[index];
        if(!bucket){
            return false;
        }

        return !!bucket.find(key);
    }

    remove(key){
        const index = this.hash(key) % this.capacity;
        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }
          
        const bucket = this.buckets[index];
        if (!bucket){
            return false;
        }

        let current = bucket.head;
        let prev = null;

        while(current){
            if(current.value[0] == key){
                if(prev){
                    prev.next = current.next;
                } else {
                    bucket.head = current.next;
                }
                bucket.length--;
                this.size--;
                return true;
            }
            prev = current;
            current = current.next;
        }
        return false;
    }

    length(){
        return this.size;
    }

    clear(){
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys(){
        let keys = [];
        this.buckets.forEach(bucket => {
           if(bucket){
            let current = bucket.head;
            while(current){
               keys.push(current.value[0]); 
               current = current.next;
            }
           }
        })
        return keys;
    }
    
    values(){
        let values = [];
         this.buckets.forEach(bucket => {
           if(bucket){
            let current = bucket.head;
            while(current){
               values.push(current.value[1]); 
               current = current.next;
            }
           }
        })
        return values;
    }

    entries(){
        let entries = [];
        this.buckets.forEach(bucket => {
            if(bucket){
                let current = bucket.head;
                while(current){
                    entries.push([current.value[0], current.value[1]]);
                    current = current.next;
                }
            }
        })
        return entries;
    }
}



class Linkedlist{
    constructor(){
        this.head = null;
        this.length = 0;
    }

    append(value){
        let newNode = new Node(value);
        if(this.head == null){
            this.head = newNode;
        }  
        else {
            let current = this.head;
            while(current.next){
                current = current.next;
                
            }
            current.next = newNode;
        }
        this.length++;  
    }

    prepend(value){
        let newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    }

    size(){
        return this.length;
    }

    getHead(){
        return this.head;
    }

    getTail(){
        let current = this.head;
        if(!current){
            return null;
        }
        while(current.next){
            current = current.next;
        }
        return current;
    }

    at(index){
        if (index < 0 || index >= this.length){
            return null;
        }
        let current = this.head;
        for(let i = 0; i < index; i++){
            current = current.next;
        }
        return current;
    }

    pop(){
        if(!this.head){
            return;
        }
        if(!this.head.next){
            this.head = null;
        } else{
        let current = this.head;
        while(current.next.next){
            current = current.next;
        }
        current.next = null;
        } 
        this.length--;  
    }
    
    contains(value){
        let current = this.head;
        while(current){
            if(value == current.value){
                return true;
            }
            current = current.next;
        }
        return false;
    }

    find(key){
        let current = this.head;

        while (current) {
            if (current.value[0] === key) {
                return current;  
            }
            current = current.next;
        }

        return null;  
    }

    toString(){
        let current = this.head;
        let resultString = '';

        while(current){
            resultString += `( ${current.value} ) -> `;
            current = current.next;
        }
        resultString += 'null';
        return resultString;
    }

}

class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
