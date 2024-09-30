import Modal from "@/components/Modal";
import styles from "./styles.module.scss";

const Credits = () => {
    return (
        <Modal name="credits">
                <h2 className={styles.creditsTitle}>Credits</h2>
                <div className={styles.creditsContent}>
                    <section>
                        <p>Imagined, coded and designed by <a href="https://github.com/jolisdegats" target="_blank" rel="noopener noreferrer">Jolisdegats</a>.</p>
                    </section>
                    <section>
                        <h3>Music</h3>
                        <ul>
                            <li>Radio musics: <a href="https://www.youtube.com/watch?v=5rWYD-7B5UE" target="_blank" rel="noopener noreferrer">&quot;Happy Children&quot; by P. Lion</a></li>
                            <li>Added a vintage radio effect from <a href="https://voicechanger.io/" target="_blank" rel="noopener noreferrer">Voicechanger.io</a></li>
                       
                        </ul>
                    </section>
                        <section>
                        <h3>Sound effects</h3>   
                                <ul>
                                    <li>Radio tuning sound from [Source]</li>
                                    <li>Coffee machine sounds from [Source]</li>
                                    <li>Cat purring sound from [Source]</li>
                                </ul>
                            </section>
                        <section>
                        <h3>Images</h3>    
                                <ul>
                                    <li>Main background & cloud images designed on <a href="https://midjourney.com/" target="_blank" rel="noopener noreferrer">Midjourney</a> + some Photoshop edits</li>
                                </ul>
                    </section>
                    <section>
                        <h3>Libraries and Frameworks</h3>
                        <ul>
                            <li>Next.js</li>
                            <li>React</li>
                            <li>Framer Motion</li>
                            <li>use-sound</li>
                            <li>SASS</li>
                        </ul>
                    </section>
                    <section>
                        <h3>Inspirations</h3>
                        <ul>
                            <li>All point & click games I played (the list is too long to put here) & <a href="https://manidavilay.com/" target="_blank" rel="noopener noreferrer">my dear friend&apos;s portfolio Many</a></li>
                            <li>Coffee game: Original idea from <a href="https://codepen.io/ElJefe/pen/vEERrW" target="_blank" rel="noopener noreferrer">Beer Filling Game by Jeff Putnam</a></li>
                            <li>Coffee machine design: Based on <a href="https://codepen.io/smail-boundaoui/pen/bGpZOVm" target="_blank" rel="noopener noreferrer">CSS Coffee Machine by Smail Boundaoui</a></li>
                        </ul>
                    </section>
                </div>
                <footer className={styles.creditsFooter}>
                    <p>Thank you for playing!</p>
                </footer>
        </Modal>
    )
}

export default Credits;