import { topBooks } from "../../props/topBooks";
import { About } from "./AboutSection";
import { AllCategories } from "./AllCategories";
import { BookCategory } from "./BookCategory";
import { FamousBooks } from "./FamousBooks";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Info } from "./InfoSection";

export function HomePage(){
    return(
        <>
        <Header/>
        <AllCategories />
        <FamousBooks books={topBooks}/>
        <About />
        <BookCategory />
        <Footer />
        </>
    )
}