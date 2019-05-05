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

let resultinfo = [{
        title: '斷捨離',
        img: '',
        star: '',
        state: '作為減物生活最初代表著作之一，\
                適合給不知從何下手或仰賴豐富資訊的你。</br>\
                在本測驗推薦的三本書中，我們認為是最具邏輯性與客觀性的。</br>\
                斷捨離一書中，所闡述的減物法則，簡單而言也就是「斷」「捨」「離」三個步驟，</br>\
                必須維持其順序性。「斷」與「捨」是行為上的要求，斷絕不必要的物品獲取，</br>\
                以及捨去已堆積不會用的物品，從中得到「脫離」物欲執著的狀態，</br>\
                屬精神層次的提升，也是作者不斷提到思維要從「看得到的世界」到「看不到的世界」改變的意思。</br>\
                即「斷」與「離」是這個減物法則的方法，而「離」是希望達到的狀態。'

    },
    {
        title: '我決定這樣簡單生活',
        img: '',
        star: '',
        state: '2012年在日本大為暢銷的生活風格書籍，</br>\
                在測驗中推薦的另一本書「我決定簡單的生活」</br>\
                作者也在自己的著作內反覆提到，更強調了它出版後對極簡主義的奠基有著巨大的影響。</br>\
                「怦然心動的整理魔法」推薦給很了解自己、想更珍惜物品的你，</br>\
                對比其他兩本推薦書，減物的規則更加彈性，「能讓你怦然心動的物品通通可以留下！」</br>\
                這樣可愛的概念，目的是在塑造真正理想的環境，</br>\
                不把減少物品當成目標，而是透過減少不喜愛的物品，讓自己的生活更有愛。</br>\
                作者更發下「只要實踐怦然心動法則，房間就再也不會變亂！」的保證，</br>\
                這樣的整理魔法，請你務必試試看！'
    },
    {
        title: '怦然心動的人生整理魔法',
        img: '',
        star: '',
        state: '「極簡主義者」的誕生代表作。</br>\
                作者佐佐木典士是亞洲區域第一個出版分享「極簡主義」生活實際方法的人，</br>\
                更是因為極簡主義而改變人生的證明者。</br>\
                這本書適合意志堅定、乾脆俐落的你，</br>\
                內容條列式說明了極簡主義的起源以及存在的意義，</br>\
                作者懇切地分享了自己從垃圾屋到空無一物房間的過程（附有一系列轉變的紀錄圖），</br>\
                這個減物法則也是本測驗三本書中，有著最大反轉魅力的一個。</br>\
                「極簡主義」比起「斷捨離」或是「怦然心動法則」，</br>\
                不太像是一個行動上的步驟建議，更多的是一個生活原則的建立，</br>\
                它沒有一定的答案或方法，相信每個人都有自己前進的方法，</br>\
                只是想讓你知道小而美的生活模式，知道你可以代表自己，而不用用擁有什麼展示自己。'
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
            pageNow: 0,
            resultinfos: resultinfo,

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



            // this.SwitchType(this.type.substring(6));

            this.steps[0].value = this.result[0].value;
            this.steps[1].value = this.result[1].value;
            this.steps[2].value = this.result[2].value;

            this.steps.sort(function (a, b) {
                return b.value - a.value;
            })
            this.pageNow++;
            this.showStar();
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
            this.pageNow++;
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

        showStar: function (index) {
            let value = this.result[index].value;
            return value;
        },

        //動態產生ID
        fromId: function (topic, option) {
            return topic + "_" + option;
        },
        resultId: function (result) {
            return "result" + result;
        },


        showItem: function (index) {
            if (index >= this.now && index < (this.now + 3)) {
                return true;
            } else {
                return false;
            }
        }
    },
});

// console.log(vm.showstar());


Vue.config.devtools = true;