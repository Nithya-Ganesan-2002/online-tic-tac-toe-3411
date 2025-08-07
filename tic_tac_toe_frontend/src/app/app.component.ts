import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * TicTacToe Game Angular Component
 * Implements a responsive, modern, light-themed tic tac toe game.
 * - User-friendly game board
 * - Detects win, draw, and ongoing states
 * - Restart game function
 * - Displays player turn and status
 * - Responsive design for desktop and mobile
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /** Title for header */
  title = 'Tic Tac Toe';

  /** 3x3 game board as a 2D array of strings */
  board: string[][] = [];
  /** Current player: 'X' or 'O' */
  currentPlayer: 'X' | 'O' = 'X';
  /** Game status: 'ongoing', 'draw', or 'win' */
  status: 'ongoing' | 'draw' | 'win' = 'ongoing';
  /** Winner: 'X' or 'O' or '' (none) */
  winner: '' | 'X' | 'O' = '';
  /** Status display text */
  statusText: string = '';
  /** Current year for footer */
  currentYear: number = new Date().getFullYear();

  /**
   * Initialize or restart the game.
   * PUBLIC_INTERFACE
   */
  ngOnInit() {
    this.restartGame();
  }

  /**
   * Handles user click on a board cell.
   * @param row Row index (0-2)
   * @param col Col index (0-2)
   * PUBLIC_INTERFACE
   */
  onCellClick(row: number, col: number): void {
    if (this.status !== 'ongoing' || this.board[row][col]) {
      return;
    }
    this.board[row][col] = this.currentPlayer;
    if (this.checkWin(this.currentPlayer)) {
      this.status = 'win';
      this.winner = this.currentPlayer;
      this.statusText = `Player ${this.currentPlayer} wins! 🎉`;
    } else if (this.checkDraw()) {
      this.status = 'draw';
      this.statusText = `It's a draw! 🤝`;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      this.statusText = `Player ${this.currentPlayer}'s turn`;
    }
  }

  /**
   * Restart the game to initial state.
   * PUBLIC_INTERFACE
   */
  restartGame(): void {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(''));
    this.currentPlayer = 'X';
    this.status = 'ongoing';
    this.winner = '';
    this.statusText = `Player ${this.currentPlayer}'s turn`;
  }

  /**
   * Check if the specified player has won.
   * @param player 'X' or 'O'
   * @returns true if player has won
   * PUBLIC_INTERFACE
   */
  checkWin(player: 'X' | 'O'): boolean {
    // check rows, columns, diagonals
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === player &&
          this.board[i][1] === player &&
          this.board[i][2] === player) return true;
      if (this.board[0][i] === player &&
          this.board[1][i] === player &&
          this.board[2][i] === player) return true;
    }
    if (this.board[0][0] === player &&
        this.board[1][1] === player &&
        this.board[2][2] === player) return true;
    if (this.board[0][2] === player &&
        this.board[1][1] === player &&
        this.board[2][0] === player) return true;
    return false;
  }

  /**
   * Check if the game is a draw (all cells filled, no winner).
   * @returns true if draw
   * PUBLIC_INTERFACE
   */
  checkDraw(): boolean {
    return this.board.every(row => row.every(cell => cell)) && !this.checkWin('X') && !this.checkWin('O');
  }
}
