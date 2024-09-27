#include <stdio.h>

char board[3][3];
char currentPlayer = 'X';

// Function declarations
void initializeBoard();
void printBoard();
int checkWin();
void makeMove();
int checkDraw();

int main() {
    int gameStatus = 0;
    initializeBoard();
    
    while (gameStatus == 0) {
        printBoard();
        makeMove();
        gameStatus = checkWin();
        
        if (gameStatus == 0 && checkDraw()) {
            printBoard();
            printf("It's a draw!\n");
            return 0;
        }
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    }
    
    printBoard();
    printf("Player %c wins!\n", currentPlayer);
    return 0;
}

// Function to initialize the board with numbers
void initializeBoard() {
    int i, j;
    int count = 1;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            board[i][j] = count + '0';
            count++;
        }
    }
}

// Function to print the board
void printBoard() {
    printf("\n");
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            printf(" %c ", board[i][j]);
            if (j < 2) printf("|");
        }
        printf("\n");
        if (i < 2) printf("---|---|---\n");
    }
    printf("\n");
}

// Function to check if a player has won
int checkWin() {
    for (int i = 0; i < 3; i++) {
        // Check rows and columns
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2])
            return 1;
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i])
            return 1;
    }
    
    // Check diagonals
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2])
        return 1;
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0])
        return 1;
    
    return 0;
}

// Function to check if the game is a draw
int checkDraw() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i][j] != 'X' && board[i][j] != 'O')
                return 0;
        }
    }
    return 1;
}

// Function to make a move
void makeMove() {
    int move;
    int validMove = 0;
    
    while (!validMove) {
        printf("Player %c, enter your move (1-9): ", currentPlayer);
        scanf("%d", &move);
        
        if (move < 1 || move > 9) {
            printf("Invalid move! Try again.\n");
            continue;
        }
        
        int row = (move - 1) / 3;
        int col = (move - 1) % 3;
        
        if (board[row][col] != 'X' && board[row][col] != 'O') {
            board[row][col] = currentPlayer;
            validMove = 1;
        } else {
            printf("The cell is already taken! Try again.\n");
        }
    }
}
