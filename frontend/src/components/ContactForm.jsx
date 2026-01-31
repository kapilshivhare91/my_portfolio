import React, { useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const ContactForm = ({ className = "" }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        axios.post('http://127.0.0.1:8001/api/contact/', formData)
            .then(res => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            })
            .catch(err => {
                console.error(err);
                setStatus('error');
            });
    };

    return (
        <Card className={`flex flex-col justify-center ${className}`}>
            <h2 className="text-2xl font-bold mb-4">Contact Me</h2>

            {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-green-400">
                    <FaCheckCircle className="text-5xl mb-4" />
                    <p className="text-xl">Message Sent!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:border-blue-500 focus:outline-none resize-none"
                    ></textarea>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {status === 'sending' ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                    </button>

                    {status === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                            <FaExclamationCircle /> Failed to send message. Please try again.
                        </div>
                    )}
                </form>
            )}
        </Card>
    );
};

export default ContactForm;
