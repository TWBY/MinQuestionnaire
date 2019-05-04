//resultA/resultB/resultC
let everytype = {
    A: '',
    B: '',
    C: '',
}

//everystep =  [{},{},{}]
let everytypes = [{
        type: "A",
        value: ''
    },
    {
        type: "B",
        value: ''
    },
    {
        type: "C",
        value: ''
    },
]



let step = [{
        order: ["step(A)1", "step(A)2", "step(A)3", "step(A)4", "step(A)5"],
        value: ''
    },
    {
        order: ["step(B)1", "step(B)2", "step(B)3", "step(B)4", "step(B)5"],
        value: ''
    },
    {
        order: ["step(C)1", "step(C)2", "step(C)3", "step(C)4", "step(C)5"],
        value: ''
    }
]


function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            questions: '',
            result: everytypes, //A,B,C
            type: '', //測驗結果 A
            steps: step,
            now: 0,
            pagenow: 0
        }
    },
    created() {
        axios
            .get('quest.json')
            .then(val => {
                this.questions = val.data
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
                var totalA = 0;
                var totalB = 0;
                var totalC = 0;
                this.questions.forEach(function (val) {
                    if (val.selected === "A") {
                        totalA++;
                    } else if (val.selected === "B") {
                        totalB++;
                    } else {
                        totalC++;
                    }
                });
                this.result[0].value = totalA;
                this.result[1].value = totalB;
                this.result[2].value = totalC;
            } else {
                alert('你尚未完成所有問題');
            }

            // this.mostbig();

            // this.SwitchType(this.type.substring(6));

            this.steps[0].value = this.result[0].value;
            this.steps[1].value = this.result[1].value;
            this.steps[2].value = this.result[2].value;

            this.steps.sort(function (a, b) {
                return b.value - a.value;
            })
            this.pagenow++;
        },
        //找到最大值
        // mostbig: function () {
        //     let arr = Object.values(this.result);
        //     let max = Math.max(...arr);

        //     return this.type = getKeyByValue(this.result, max);
        // },

        //計算每一個type的時候
        // sum: function (type) {
        //     // let total = 0;
        //     // this.questions.forEach(function (val) {
        //     //     if (val.selected === type.substring(6))
        //     //         total++;
        //     // });
        //     this.result[1] = 10;
        //     console.log(this.result[1]);
        // },

        //跟據測驗結果，把資料庫的內容設定只有最高值的書本跟步驟
        SwitchType: function (type) {
            var everytypes = ["A", "B", "C"];
            for (let i = 0; i < everytypes.length; i++) {
                if (everytypes[i] === type) {
                    // this.books = bookdata[i];
                    this.steps = step[i];
                }
            }
        },
        start: function () {
            this.pagenow++;
        },
        last: function () {
            this.now = this.now - 3;
        },
        next: function () {
            if (this.questions[this.now].selected !== null) {
                this.now = this.now + 3;
            } else {
                alert('你尚未作答唷')
            }
            console.log(this.now);
        },

        reset: function () {
            this.questions.forEach(function (val) {
                val.selected = null;
            });
        },


        //動態產生ID
        fromId: function (topic, option) {
            return topic + "_" + option
        },
        showitem: function (index) {
            if (index >= this.now && index < (this.now + 3)) {
                return true;
            } else {
                return false;
            }
        }
    },
});


Vue.config.devtools = true;