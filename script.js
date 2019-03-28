

// var quests = [{
//         quest: '這是第一題(A)',
//         options: [{
//                 value: 1
//             },
//             {
//                 value: 2
//             },
//             {
//                 value: 3
//             },
//             {
//                 value: 4
//             },
//         ],
//         selected: 1,
//         type: 'A',
//     },
//     {
//         quest: '這是第二題(B)',
//         options: [{
//                 value: 1
//             },
//             {
//                 value: 2
//             },
//             {
//                 value: 3
//             },
//             {
//                 value: 4
//             },
//         ],
//         selected: 1,
//         type: 'B',
//     },
//     {
//         quest: '這是第三題(B)',
//         options: [{
//                 value: 1
//             },
//             {
//                 value: 2
//             },
//             {
//                 value: 3
//             },
//             {
//                 value: 4
//             },
//         ],
//         selected: null,
//         type: 'B'
//     },
//     {
//         quest: '這是第四題(C)',
//         options: [{
//                 value: 1
//             },
//             {
//                 value: 2
//             },
//             {
//                 value: 3
//             },
//             {
//                 value: 4
//             },
//         ],
//         selected: 3,
//         type: 'C',
//     },
//     {
//         quest: '這是第五題(C)',
//         options: [{
//                 value: 1
//             },
//             {
//                 value: 2
//             },
//             {
//                 value: 3
//             },
//             {
//                 value: 4
//             },
//         ],
//         selected: null,
//         type: 'C',
//     },
//     {
//         quest: '這是第六題(A)',
//         options: [{
//                 value: 1
//             },
//             {
//                 value: 2
//             },
//             {
//                 value: 3
//             },
//             {
//                 value: 4
//             },
//         ],
//         selected: null,
//         type: 'A',
//     },
// ];

var everytype = {
                resultA: '',
                resultB: '',         
                resultC: '',
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

var vm = new Vue({
    el: '#app',
    data: {
        questions: '',
        result: everytype,
        type: '',
    },
    created(){
        axios
            .get('quest.json')
            .then(val => {this.questions = val.data
            })

    },
    computed: {

    },
    methods: {
        settlement: function () {

            var ans = true;
            //檢查每一個選項是不是都有選擇到了，並且設定回原本
            this.questions.forEach(function (val) {
                if (val.selected == null) {
                    ans = false;
                }
            });

            //計算三個屬性的大小
            if (ans) {
                this.result.resultA = this.sum('A');
                this.result.resultB = this.sum('B');
                this.result.resultC = this.sum('C'); 
            } else {
                alert('你尚未完成所有問題');
            }

            this.mostbig();

        },
        mostbig: function(){
            let arr = Object.values(this.result);
            let max = Math.max(...arr);
        
            return this.type = getKeyByValue(this.result, max);
        },

        //計算每一個type的時候
        sum: function(type){
            var total = 0
            this.questions.forEach(function(val){
                if(val.type == type){
                    total += val.selected;
                }
            });
            return total;
        },

        reset: function () {
            this.questions.forEach(function (val) {
                val.selected = null;
            });
        },


        //動態產生ID
        fromId : function (topic, option){
            return topic + "_" +　option    
        },
    },
});


