const Loading = () => (
    <>
        <style>{`
                    .loading-dots::after {
                        content: '';
                        animation: dots 1.5s steps(4, end) infinite;
                    }
    
                    @keyframes dots {
                        0% { content: ''; }
                        25% { content: '.'; }
                        50% { content: '..'; }
                        75% { content: '...'; }
                    }
                    `}
        </style>
        <div>Loading<span className="loading-dots"></span></div>
    </>
)

export default Loading