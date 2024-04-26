const NoChatSelected = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-2 px-4 text-center font-semibold text-black sm:text-lg md:text-xl">
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default NoChatSelected;
