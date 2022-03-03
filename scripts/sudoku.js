$(document).ready(function(){

    //Global for holding errors
    let errors = new Set();

    // Give id to each cell on board
    let row = 1;
    let col = 1;
    let undoValue;
    let undoCell;
    $('#board td').each(function(){
        $(this).attr('id', '' + row + col);
        $(this).addClass('invis');
        $(this).text('-1');
        col++;
        if(col % 10 == 0){
            col = 1;
            row++;
        }
    });

    // Dynamically give the starter values on the sudoku board and remove
    // their transparent placeholder values of -1
    $('#12').text('1');
    $('#12').removeClass('invis');
    $('#18').text('9');
    $('#18').removeClass('invis');
    $('#23').text('4');
    $('#23').removeClass('invis');
    $('#27').text('2');
    $('#27').removeClass('invis');
    $('#33').text('8');
    $('#33').removeClass('invis');
    $('#36').text('5');
    $('#36').removeClass('invis');
    $('#48').text('3');
    $('#48').removeClass('invis');
    $('#51').text('2');
    $('#51').removeClass('invis');
    $('#55').text('4');
    $('#55').removeClass('invis');
    $('#57').text('1');
    $('#57').removeClass('invis');
    $('#73').text('1');
    $('#73').removeClass('invis');
    $('#74').text('8');
    $('#74').removeClass('invis');
    $('#77').text('6');
    $('#77').removeClass('invis');
    $('#82').text('3');
    $('#82').removeClass('invis');
    $('#88').text('8');
    $('#88').removeClass('invis');
    $('#93').text('6');
    $('#93').removeClass('invis');

    // Give id to each cell on numLine
    $('#numLine td').each(function(index){
        $(this).attr('numline_id', '' + (index+1));
    });

    // Click a specific button and get its id
    let numberSelected = false;
    let selectedCellValue = null;
    $('td').click(function(){
        if($(this).parents("#board").length == 1){
            boardClick($(this).attr('id'));
        }
        else{
            numLineClick($(this).attr('numline_id'));
        }
    });

    // When numLine is clicked
    function numLineClick(column){
        if(column == 10){
            // UNDO HERE
            undo();
            selectedCellValue = null;
            numberSelected = false;
        }else if(numberSelected){
            selectedCellValue = null;
            numberSelected = false;
        }else{
            selectedCellValue = column;
            numberSelected = true;
        }
    }

    // When board is clicked
    function boardClick(id){
        if(numberSelected){
            undoValue = $('#' + id).text();
            undoCell = id;
            $('#' + id).removeClass('invis');
            $('#' + id).text(selectedCellValue);
            numberSelected = false;
            selectedCellValue = null;
            // calls to check rules of sudoku
            checkRules(id);
        }
    }

    //Undo the previous move
    function undo(){
        $('#' + undoCell).text(undoValue);
        if($('#' + undoCell).text() == '-1'){
            $('#' + undoCell).addClass('invis');
        }

        errors.forEach(error => {
            checkRules(error);
        });
    }


    function checkRules(id){
        // remove counts different sudoku rules that are not violated (ie: if remove == 2,
        // then 1 of row, col or block failed)
        let remove = 0;
        col = id % 10;
        row = (id - col) / 10;


        //Go over each one individually so that all errors can be detected
        if(sameBlock(id, col, row)){
            remove++;
        }
        if(sameRow(id, col, row)){
            remove++;
        }
        if(sameColumn(id, col, row)){
            remove++;
        }
        if(remove == 3){
            $('#' + id).removeClass('error');
        }
    }

    // Check for error is same block
    function sameBlock(id, x, y){
        let val = $('#' + id).text();
        let checkVal;
        for(let i = Math.floor((y-1)/3)*3+1; i < Math.floor((y-1)/3)*3+4; i++){
            for(let j = Math.floor((x-1)/3)*3+1; j < Math.floor((x-1)/3)*3+4; j++){
                checkVal = i*10 + j;
                if(i == y && j == x){
                    continue;
                }
                if(val == $('#' + checkVal).text() && val != -1){
                    $('#' + id).addClass('error');
                    $('#' + checkVal).addClass('error');
                    errors.add(id);
                    errors.add(checkVal);
                    return false;
                }
            }
        }
        return true;
    }
    
    // Check for error is same row
    function sameRow(id, x, y){
        let val = $('#' + id).text();
        let checkVal;
        for(let i = 1; i < 10; i++){
            checkVal = y*10 + i;
            if(i == x){
                continue;
            }
            if(val == $('#' + checkVal).text() && val != -1){
                $('#' + id).addClass('error');
                $('#' + checkVal).addClass('error');
                errors.add(id);
                errors.add(checkVal);
                return false;
            }
        }
        return true;
    }
    
    // Check for error is same column
    function sameColumn(id, x, y){
        let val = $('#' + id).text();
        let checkVal;
        for(let i = 1; i < 10; i++){
            checkVal = i*10 + x;
            if(i == y){
                continue;
            }
            if(val == $('#' + checkVal).text() && val != -1){
                $('#' + id).addClass('error');
                $('#' + checkVal).addClass('error');
                errors.add(id);
                errors.add(checkVal);
                return false;
            }
        }
        return true;
    }
});