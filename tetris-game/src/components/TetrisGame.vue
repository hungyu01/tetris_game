<template>
    <div class="tetris-game">
    <canvas ref="gameCanvas" width="300" height="600"></canvas>
    <div class="game-info">
        <p>分數: {{ score }}</p>
        <p>等級: {{ level }}</p>
        <button @click="startGame">開始遊戲</button>
    </div>
    </div>

    <!-- 難度設定 -->
    <select v-model="difficulty"  @change="changeDifficulty">
        <option value="1">簡單</option>
        <option value="2">普通</option>
        <option value="3">困難</option>
        <option value="4">專家</option>
        <option value="5">地獄</option>
    </select>
    <!-- ... -->
</template>
    
    <script>
    export default {
        data() {
        return {
            score: 0,
            level: 1,
            gameLoop: null,
            ctx: null,
            board: [],
            currentPiece: null,
            // 其他遊戲狀態...
        }
        },
        mounted() {
        this.ctx = this.$refs.gameCanvas.getContext('2d');
        this.initBoard();
        },
        methods: {
        initBoard() {
            this.board = Array(20).fill().map(() => Array(10).fill(0));
        },
        startGame() {
            this.score = 0;
            this.level = 1;
            this.initBoard();
            this.spawnPiece();
            this.gameLoop = setInterval(this.update, 1000 / 60);
        },
        spawnPiece() {
            // 生成新的方塊
        },
        update() {
            this.movePieceDown();
            this.draw();
        },
        movePieceDown() {
            // 移動方塊向下
        },
        draw() {
            // 繪製遊戲畫面
        },
        // 其他遊戲邏輯方法...
        }
    }

    // 難度設置
    export default {
    // ...
    data() {
        return {
        // ...
        difficulty: 1,
        fallSpeed: 1000,
        }
    },
    methods: {
        // ...
        changeDifficulty() {
        const speeds = [1000, 750, 500, 250, 100];
        this.fallSpeed = speeds[this.difficulty - 1];
        // 根據難度調整其他參數...
        },
        // ...
    }
    }
  </script>
  
  <style scoped>
  .tetris-game {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .game-info {
    margin-left: 20px;
  }
  </style>