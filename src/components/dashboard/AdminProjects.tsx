import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';
import { projectsApi } from '../../services/api';
import type { ProjectRequest, ProjectResponse, ApiResponse } from '../../types/api';

const emptyForm: ProjectRequest = { title: '', shortDescription: '', description: '', price: 0, currency: 'INR', category: '', tags: [], thumbnailUrl: '', active: true };

const FormModal: React.FC<{
    form: ProjectRequest;
    setForm: React.Dispatch<React.SetStateAction<ProjectRequest>>;
    editing: ProjectResponse | null;
    setShowForm: (show: boolean) => void;
    save: () => void;
    loading: boolean;
    error: string;
}> = ({ form, setForm, editing, setShowForm, save, loading, error }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{editing ? 'Edit Project' : 'Create Project'}</h3>
                <button className="p-2" onClick={() => setShowForm(false)}><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm">Title</label>
                    <input className="w-full mt-1 p-2 border rounded" value={form.title}
                        onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} />
                </div>
                <div>
                    <label className="text-sm">Slug (optional)</label>
                    <input className="w-full mt-1 p-2 border rounded" value={form.slug || ''}
                        onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm">Short Description</label>
                    <input className="w-full mt-1 p-2 border rounded" value={form.shortDescription || ''}
                        onChange={e => setForm(prev => ({ ...prev, shortDescription: e.target.value }))} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm">Description</label>
                    <textarea className="w-full mt-1 p-2 border rounded" rows={4} value={form.description || ''}
                        onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} />
                </div>
                <div>
                    <label className="text-sm">Price</label>
                    <input type="number" className="w-full mt-1 p-2 border rounded" value={form.price ?? ''}
                        onChange={e => {
                            const v = e.target.value;
                            setForm(prev => ({ ...prev, price: v === '' ? undefined : Number(v) }));
                        }} />
                </div>
                <div>
                    <label className="text-sm">Currency</label>
                    <input className="w-full mt-1 p-2 border rounded" value={form.currency || 'INR'}
                        onChange={e => setForm(prev => ({ ...prev, currency: e.target.value }))} />
                </div>
                <div>
                    <label className="text-sm">Category</label>
                    <input className="w-full mt-1 p-2 border rounded" value={form.category || ''}
                        onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} />
                </div>
                <div>
                    <label className="text-sm">Tags (comma separated)</label>
                    <input className="w-full mt-1 p-2 border rounded" value={(form.tags || []).join(', ')}
                        onChange={e => setForm(prev => ({ ...prev, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))} />
                </div>
                <div className="md:col-span-2">
                    <label className="text-sm">Thumbnail URL (public)</label>
                    <input className="w-full mt-1 p-2 border rounded" placeholder="https://.../image.jpg or /assets/img.jpg"
                        value={form.thumbnailUrl || ''}
                        onChange={e => setForm(prev => ({ ...prev, thumbnailUrl: e.target.value }))} />
                    {form.thumbnailUrl && (
                        <div className="mt-2">
                            <img src={form.thumbnailUrl} alt="thumbnail preview" className="h-24 w-24 object-cover rounded border" onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                    )}
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                    <input id="active" type="checkbox" checked={form.active ?? true}
                        onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))} />
                    <label htmlFor="active">Active</label>
                </div>
            </div>
            {error && <p className="text-red-600 mt-3">{error}</p>}
            <div className="mt-6 flex justify-end gap-2">
                <button className="px-3 py-2 border rounded" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded inline-flex items-center" onClick={save} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Check className="h-4 w-4 mr-2" />}
                    Save
                </button>
            </div>
        </div>
    </div>
);

const AdminProjects: React.FC = () => {
    const [items, setItems] = useState<ProjectResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<ProjectResponse | null>(null);
    const [form, setForm] = useState<ProjectRequest>(emptyForm);

    const load = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await projectsApi.adminList();
            if (res.success && res.data) setItems(res.data);
            else setError(res.message || 'Failed to load projects');
        } catch (e: any) {
            setError(e.message || 'Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const startCreate = () => { setEditing(null); setForm({ ...emptyForm }); setShowForm(true); };
    const startEdit = (p: ProjectResponse) => {
        setEditing(p);
        setForm({
            title: p.title,
            slug: p.slug,
            shortDescription: p.shortDescription,
            description: p.description,
            price: p.price,
            currency: p.currency,
            category: p.category,
            tags: p.tags,
            thumbnailUrl: p.thumbnailUrl,
            active: p.active,
        });
        setShowForm(true);
    };

    const save = async () => {
        setLoading(true);
        setError('');
        try {
            let res: ApiResponse<ProjectResponse>;
            if (editing) res = await projectsApi.adminUpdate(editing.id, form);
            else res = await projectsApi.adminCreate(form);
            if (!res.success) throw new Error(res.message);
            setShowForm(false);
            await load();
        } catch (e: any) {
            setError(e.message || 'Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    const remove = async (p: ProjectResponse) => {
        if (!confirm(`Delete project "${p.title}"?`)) return;
        setLoading(true);
        setError('');
        try {
            const res = await projectsApi.adminDelete(p.id);
            if (!res.success) throw new Error(res.message);
            await load();
        } catch (e: any) {
            setError(e.message || 'Failed to delete project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button className="px-3 py-2 bg-blue-600 text-white rounded inline-flex items-center" onClick={startCreate}>
                    <Plus className="h-4 w-4 mr-2" /> New Project
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && !showForm && <p className="text-red-600 mb-2">{error}</p>}
            <div className="bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="text-left p-3">Title</th>
                            <th className="text-left p-3">Slug</th>
                            <th className="text-left p-3">Thumbnail</th>
                            <th className="text-left p-3">Price</th>
                            <th className="text-left p-3">Active</th>
                            <th className="text-right p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(p => (
                            <tr key={p.id} className="border-t">
                                <td className="p-3">{p.title}</td>
                                <td className="p-3 text-gray-500">{p.slug}</td>
                                <td className="p-3">
                                    {p.thumbnailUrl ? <img src={p.thumbnailUrl} alt={p.title} className="h-10 w-10 object-cover rounded border" /> : <span className="text-gray-400">—</span>}
                                </td>
                                <td className="p-3">{p.price} {p.currency}</td>
                                <td className="p-3">{p.active ? 'Yes' : 'No'}</td>
                                <td className="p-3 text-right">
                                    <button className="px-2 py-1 border rounded mr-2 inline-flex items-center" onClick={() => startEdit(p)}>
                                        <Pencil className="h-4 w-4" />
                                    </button>
                                    <button className="px-2 py-1 border rounded inline-flex items-center text-red-600" onClick={() => remove(p)}>
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && !loading && (
                            <tr><td colSpan={6} className="p-6 text-center text-gray-500">No projects yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showForm && <FormModal form={form} setForm={setForm} editing={editing} setShowForm={setShowForm} save={save} loading={loading} error={error} />}
        </div>
    );
};

export default AdminProjects;
