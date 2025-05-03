
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Define preset responses based on keywords
interface PresetResponse {
  keywords: string[];
  responses: string[];
}

export const AIChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 How can I help you with your booking today?", isUser: false, timestamp: new Date() }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // More diverse responses based on different topics
  const presetResponses: PresetResponse[] = [
    {
      keywords: ['book', 'reservation', 'stay', 'hotel', 'room'],
      responses: [
        "I can help you make a booking. What dates are you looking to stay?",
        "Would you like me to search for available hotels in a specific location?",
        "I can assist with your reservation. Do you have a specific area in mind?",
        "To help you find the perfect stay, could you tell me your destination and dates?",
        "I'd be happy to help with your booking. What type of accommodation are you looking for?"
      ]
    },
    {
      keywords: ['flight', 'plane', 'airline', 'airport', 'fly'],
      responses: [
        "Looking for flights? I can help you find the best options. Where are you flying to?",
        "For flight searches, I'll need your departure and arrival locations. Could you share those?",
        "I can help compare flight prices. When are you planning to travel?",
        "Would you prefer direct flights or are connections okay?",
        "To find you the best flight deals, could you tell me your flexible with your travel dates?"
      ]
    },
    {
      keywords: ['cancel', 'refund', 'change', 'reschedule'],
      responses: [
        "I understand you need to make changes to your booking. Could you provide your booking reference?",
        "For cancellations, please note our policy varies depending on the property. Can I have your booking details?",
        "I can help process your refund request. When was the original booking made?",
        "To assist with rescheduling, I'll need your current booking information and preferred new dates.",
        "I'll help you with your cancellation. Please be aware of any potential fees that might apply."
      ]
    },
    {
      keywords: ['price', 'cost', 'cheap', 'expensive', 'deal', 'discount', 'offer'],
      responses: [
        "I can help you find options within your budget. What price range are you comfortable with?",
        "We have several special offers available right now. What type of accommodation are you interested in?",
        "To find you the best deals, could you tell me when you're planning to travel?",
        "Our prices vary by season. When would you like to book for?",
        "I'd be happy to help you find cost-effective options. Are you looking for hotels, apartments, or another type of accommodation?"
      ]
    },
    {
      keywords: ['location', 'area', 'neighborhood', 'nearby', 'close', 'center', 'beach', 'downtown'],
      responses: [
        "The location you're interested in has several great options. Would you prefer to be near any specific attractions?",
        "That area is popular with our customers! Are you looking for something in the city center or slightly outside?",
        "For that location, I can recommend several highly-rated properties. Do you have any preferences for amenities?",
        "To help you find the perfect spot, would you prefer a beachfront property or something in the heart of the city?",
        "That's a beautiful destination! Would you like me to focus on properties with specific views or near certain landmarks?"
      ]
    },
    {
      keywords: ['family', 'kid', 'children', 'child', 'baby', 'infant'],
      responses: [
        "For family stays, I recommend looking at our family-friendly properties with extra space and amenities for children.",
        "How many children will be traveling with you? This will help me find accommodations with the right room configuration.",
        "Our family-friendly hotels often include features like kids' clubs and children's menus. Would these be important for your stay?",
        "I can help find properties that offer cribs or extra beds for families. How old are the children traveling with you?",
        "For families, I often recommend apartment-style accommodations for extra space. Would that interest you?"
      ]
    },
    {
      keywords: ['packing', 'list', 'pack', 'suitcase', 'luggage'],
      responses: [
        "Have you tried our new Packing List Generator? It can create a customized list based on your destination and trip length.",
        "Packing efficiently can make your trip so much better! Our Packing List Generator tool can help you organize what you need.",
        "If you're wondering what to pack, I recommend checking out our new Packing List Generator feature in the navigation bar.",
        "Not sure what to bring? Try our personalized Packing List Generator for a tailored list based on your destination and trip style.",
        "Our new Packing List Generator can help you prepare for your trip. Would you like me to explain how to use it?"
      ]
    },
    {
      keywords: ['AR', 'augmented reality', 'preview', '3D', 'virtual', 'tour'],
      responses: [
        "Our new AR Property Preview feature lets you see properties in augmented reality before booking. Have you tried it yet?",
        "With our AR Preview feature, you can visualize how spacious rooms are in selected properties. Look for the AR Preview badge on listings.",
        "Augmented reality makes choosing the right accommodation easier. Check out properties with the AR Preview badge for this feature.",
        "Our AR property technology helps you get a better feel for spaces before booking. It's available on select properties.",
        "If you're interested in seeing properties in AR, look for the AR Preview badge on our listings. Would you like me to show you some examples?"
      ]
    },
    {
      keywords: ['journal', 'memory', 'photo', 'trip', 'document', 'diary'],
      responses: [
        "Our new Travel Journal feature lets you document your trips and upload photos. Have you tried creating an entry yet?",
        "The Travel Journal is perfect for keeping track of your adventures. You can access it from the navigation menu.",
        "To preserve your travel memories, try our Travel Journal feature. It's a great way to document experiences and share photos.",
        "Many users enjoy our Travel Journal for documenting their trips. You can add photos, highlights, and write about your experiences.",
        "If you'd like to keep a record of your trips, our Travel Journal feature is available in the navigation menu. Would you like to know more about it?"
      ]
    },
    {
      keywords: ['guide', 'local', 'recommendation', 'recommend', 'tip', 'advice'],
      responses: [
        "Our Local Guides feature provides community recommendations for destinations. Have you explored it yet?",
        "For insider tips and local recommendations, check out our Local Guides section accessible from the navigation bar.",
        "Looking for authentic experiences? Our Local Guides feature has recommendations from residents and frequent travelers.",
        "The Local Guides section offers tips on restaurants, activities, and hidden gems from people familiar with the area.",
        "If you're looking for authentic experiences, I recommend browsing our Local Guides section for community-driven recommendations."
      ]
    }
  ];

  // Default responses for when no keywords match
  const defaultResponses = [
    "How else can I assist with your travel plans today?",
    "Is there anything specific about your booking that you'd like to know?",
    "I'm here to help make your travel experience better. What can I do for you?",
    "Do you have any other questions about your upcoming trip?",
    "I'd be happy to provide more information about our services. What are you interested in?"
  ];

  // Mock function for Gemini API integration
  const getGeminiResponse = (userMessage: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        // Check if any keywords match
        for (const preset of presetResponses) {
          if (preset.keywords.some(keyword => 
              userMessage.toLowerCase().includes(keyword.toLowerCase()))) {
            // Return a random response from the matching category
            const randomIndex = Math.floor(Math.random() * preset.responses.length);
            resolve(preset.responses[randomIndex]);
            return;
          }
        }
        
        // If no keywords match, use a default response
        const randomIndex = Math.floor(Math.random() * defaultResponses.length);
        resolve(defaultResponses[randomIndex]);
      }, 1000);
    });
  };

  // Auto-scroll to the bottom of messages when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageInput,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageInput('');
    setIsTyping(true);
    
    try {
      // Get response from Gemini (mock for now)
      const response = await getGeminiResponse(userMessage.text);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Handle errors
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble processing your request right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-booking-secondary hover:bg-booking-primary text-white rounded-full p-4 shadow-lg transition-all duration-300 z-20 hover:scale-110"
        aria-label="Chat with AI Support"
      >
        <MessageSquare size={24} />
      </button>
      
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 md:w-96 bg-white dark:bg-booking-gray-600 rounded-lg shadow-xl border border-booking-gray-200 dark:border-booking-gray-600 flex flex-col z-20 animate-fade-in">
          {/* Chat Header */}
          <div className="bg-booking-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={20} className="mr-2" />
              <h3 className="font-semibold">AI Support</h3>
            </div>
            <button onClick={toggleChat} className="hover:bg-booking-secondary p-1 rounded transition-colors">
              <X size={18} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-96 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser 
                      ? 'bg-booking-secondary text-white' 
                      : 'bg-booking-gray-100 dark:bg-booking-gray-500 text-booking-gray-600 dark:text-white'
                  } ${message.isUser ? 'hover:bg-opacity-90' : 'hover:bg-opacity-95'} transition-colors`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-80 mt-1 block text-right">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-booking-gray-100 dark:bg-booking-gray-500 rounded-lg px-4 py-2 text-booking-gray-600 dark:text-white">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-booking-gray-400 dark:bg-booking-gray-300 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-booking-gray-400 dark:bg-booking-gray-300 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 rounded-full bg-booking-gray-400 dark:bg-booking-gray-300 animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Element for scrolling to bottom */}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="border-t border-booking-gray-200 dark:border-booking-gray-600 p-4">
            <div className="flex items-center">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your question here..."
                className="flex-1 border border-booking-gray-300 dark:border-booking-gray-500 rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-booking-secondary dark:bg-booking-gray-600 dark:text-white"
              />
              <button 
                type="submit"
                className="bg-booking-secondary text-white px-4 py-2 rounded-r-md hover:bg-booking-primary transition-colors"
                disabled={!messageInput.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
            {/* Gemini API attribution */}
            <div className="text-xs text-center mt-2 text-booking-gray-500 dark:text-booking-gray-300">
              Powered by Gemini AI
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatSupport;
