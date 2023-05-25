import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white; 
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Anouncements = () => {
  return (
    <Container>
        Super deal! Free shipping on order over Rs.500
    </Container>
  )
}

export default Anouncements