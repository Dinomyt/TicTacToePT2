import { Button } from "@chakra-ui/react";

interface Props {
    onSquareClick: () => void;
    value: string;
}

const Squares = ({value,onSquareClick}:Props) => {


    return (
        <>
            <Button 
                colorScheme='teal' 
                variant='outline' 
                onClick={onSquareClick}
                width={"60px"}
                height={"60px"}
            >
                {value}
            </Button>
        </>
    )
}

export default Squares