import { Grid } from './unnamed/Grid.js'

class Chess {
  constructor() {
    this.board = new Grid([8, 8])
    this.board.set([0, 0], new ChessFigure(ChessFigureType.Rook, ChessFigureColor.Black))
    this.board.set([0, 1], new ChessFigure(ChessFigureType.Knight, ChessFigureColor.Black))
    this.board.set([0, 2], new ChessFigure(ChessFigureType.Bishop, ChessFigureColor.Black))
    this.board.set([0, 3], new ChessFigure(ChessFigureType.Queen, ChessFigureColor.Black))
    this.board.set([0, 4], new ChessFigure(ChessFigureType.King, ChessFigureColor.Black))
    this.board.set([0, 5], new ChessFigure(ChessFigureType.Bishop, ChessFigureColor.Black))
    this.board.set([0, 6], new ChessFigure(ChessFigureType.Knight, ChessFigureColor.Black))
    this.board.set([0, 7], new ChessFigure(ChessFigureType.Rook, ChessFigureColor.Black))
    this.board.set([1, 0], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 1], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 2], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 3], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 4], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 5], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 6], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([1, 7], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.Black))
    this.board.set([6, 0], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 1], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 2], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 3], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 4], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 5], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 6], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([6, 7], new ChessFigure(ChessFigureType.Pawn, ChessFigureColor.White))
    this.board.set([7, 0], new ChessFigure(ChessFigureType.Rook, ChessFigureColor.White))
    this.board.set([7, 1], new ChessFigure(ChessFigureType.Knight, ChessFigureColor.White))
    this.board.set([7, 2], new ChessFigure(ChessFigureType.Bishop, ChessFigureColor.White))
    this.board.set([7, 3], new ChessFigure(ChessFigureType.Queen, ChessFigureColor.White))
    this.board.set([7, 4], new ChessFigure(ChessFigureType.King, ChessFigureColor.White))
    this.board.set([7, 5], new ChessFigure(ChessFigureType.Bishop, ChessFigureColor.White))
    this.board.set([7, 6], new ChessFigure(ChessFigureType.Knight, ChessFigureColor.White))
    this.board.set([7, 7], new ChessFigure(ChessFigureType.Rook, ChessFigureColor.White))
  }

  move(figure, position) {
    this._verifyThatItIsAValidMove(figure, position)

  }

  _verifyThatItIsAValidMove(figure, position) {
    this._verifyThatThePositionIsOnTheBoard(position)
    this._verifyThatTheFigureCanMoveLikeThat(figure, position)
  }

  _verifyThatThePositionIsOnTheBoard(position) {
    if (!this._isPositionOnBoard(position)) {
      throw new Error('Position seems to be outside of the board.')
    }
  }

  _isPositionOnBoard(position) {
    return this._isRowOnBoard(position[0]) && this._isColumnOnBoard(position[1])
  }

  _isRowOnBoard(row) {
    return row >= 0 && row <= 7
  }

  _isColumnOnBoard(column) {
    return column >= 0 && column <= 7
  }

  _verifyThatTheFigureCanMoveLikeThat(figure, position) {
    switch (figure.type) {
      case ChessFigureType.King:
        this._verifyThatItIsAValidKingMove(figure, position)
        return
      case ChessFigureType.Queen:
        this._verifyThatItIsAValidQueenMove(figure, position)
        return
      case ChessFigureType.Rook:
        this._verifyThatItIsAValidRookMove(figure, position)
        return
      case ChessFigureType.Knight:
        this._verifyThatItIsAValidKnightMove(figure, position)
        return
      case ChessFigureType.Bishop:
        this._verifyThatItIsAValidBishopMove(figure, position)
        return
      case ChessFigureType.Pawn:
        this._verifyThatItIsAValidPawnMove(figure, position)
        return
    }
  }

  _verifyThatItIsAValidKingMove(figure, position) {
    if (!this._isAValidKingMove(figure, position)) {
      throw new Error('The move seems to be an invalid king move.')
    }
  }

  _isAValidKingMove(figure, position) {
    const currentPosition = this._determineCurrentPosition(figure)
    const currentRow = currentPosition[0]
    const currentColumn = currentPosition[1]
    const destinationRow = position[0]
    const destinationColumn = position[1]
    const rowDelta = Math.abs(currentRow - destinationRow)
    const columnDelta = Math.abs(currentColumn - destinationColumn)
    return (
      rowDelta <= 1 && columnDelta <= 1 && (rowDelta > 0 || columnDelta > 0) &&
      (this._isFieldFree(position) || this._hasFieldAFigureOfOtherColor(position, figure.color)) &&
      !this._isKingInCheckMateWhenMovingFigureLikeThat(figure, position)
    )
  }

  _isFieldFree(position) {
    const figure = this.board.get(position)
    return !figure
  }

  _hasFieldAFigureOfOtherColor(position, color) {
    const otherColor = this._determineOtherColor(color)
    const figure = this.board.get(position)
    return Boolean(figure?.color === otherColor)
  }

  _determineOtherColor(color) {
    if (color === ChessFigureColor.Black) {
      return ChessFigureColor.White
    } else if (color === ChessFigureColor.White) {
      return ChessFigureColor.Black
    } else {
      throw new Error(`Different color than expected (${color}).`)
    }
  }

  _determineCurrentPosition(figure) {
    const entries = this.board.entries()
    const [position, _] = entries.find((position, figure2) => figure2 === figure)
    return position
  }
}

class ChessFigureType {
  static King = 1
  static Queen = 2
  static Rook = 3
  static Knight = 4
  static Bishop = 5
  static Pawn = 6
}

class ChessFigureColor {
  static Black = 1
  static White = 2
}

class ChessFigure {
  constructor(type, color) {
    this.type = type
    this.color = color
  }
}
