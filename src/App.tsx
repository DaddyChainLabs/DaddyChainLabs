import { useState } from "react";
import TerminalChat from "./components/TerminalChat";
import StatusBar from "./components/StatusBar";
import Header from "./components/Header";
import CharacterGallery from "./components/CharacterGallery";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";

export default function App() {
  const [entered, setEntered] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);

  if (!entered) {
    return <IntroScreen onEnter={() => setEntered(true)} />;
  }

  return (
    <div
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      className="min-h-screen bg-black text-white flex flex-col"
    >
      <Header />
      <StatusBar visible={statusVisible} />
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <TerminalChat
          onStatusReady={() => setStatusVisible(true)}
          onScriptComplete={() => setGalleryVisible(true)}
        />
        {galleryVisible && <CharacterGallery />}
      </main>
      <Footer />
    </div>
  );
}
