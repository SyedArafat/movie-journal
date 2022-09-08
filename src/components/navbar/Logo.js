function Logo() {
    return (
        <img className={"header-logo"} src={`${process.env.PUBLIC_URL}/logo.png`} alt="Movie Journal logo"/>
    );
}

export default Logo;
